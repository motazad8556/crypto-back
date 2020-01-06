import { Socket } from "socket.io";
import { OPEN_ORDER_ROUTES } from "../_client/enums/routes";
import { RESULT_CODE, UID_REPLACEMENT } from "../_client/enums/codes";
import { IToken } from "../_client/interfaces/auth";
import AuthManager from "../manager/Auth";
import RequestValidator from "../manager/RequestValidator";
import UserController from "../controller/User";
import { IOpenOrderCreateResponse, IOpenOrderCreateRequest, IOpenOrderFetchRequest, IOpenOrderFetchResponsePayload, IOpenOrderFetchResponse, IOpenOrderUpdateRequest, IOpenOrderUpdateResponse, IOpenOrderCancelRequest, IOpenOrderCancelResponse, IOpenOrderCancelResponsePayload, IOpenOrderCreateResponsePayload, IOpenOrderUpdateResponsePayload } from "../_client/interfaces/requests";
import LatestPriceController from "../controller/Price";
import { SYMBOL } from "../_client/enums/symbols";
import { OpenOrder } from "../entity/OpenOrder";
import OpenOrderController from "../controller/OpenOrder";
import { FindManyOptions, Like, MoreThan, LessThan } from "typeorm";
import { OpenPosition } from "../entity/OpenPosition";
import { CN_USER_INCLUDE_REL } from "../_client/enums/columnNames";
import Utils from '../_client/utils';

export class OpenOrderRouteHandler {
	private static _instance:OpenOrderRouteHandler = new OpenOrderRouteHandler();
	public static get Instance(){
		return this._instance;
	}
	private constructor(){}
	

	/**
	 * @description Handles the request to create new orders, and place them into OpenOrders
	 * @param socketInstance Instance of the socket calling the method.
	 * @param request Request package to perform the operation.
	 */
	public async handleOpenOrderCreation(socketInstance:Socket, request:IOpenOrderCreateRequest){
		//console.log(`handleOpenOrderCreation -- 1`);

		let payload:IOpenOrderCreateResponse;
		const ROUTE = OPEN_ORDER_ROUTES.CREATE;
		let _payload:IOpenOrderCreateResponsePayload = {record: null};
		let _resultCode: RESULT_CODE;

		try{
			let invalidCode:RESULT_CODE = null;
			let userToken: IToken = null;
			try{
				//console.log(`handleOpenOrderCreation -- 3`);
				userToken = await AuthManager.parseToken(request._meta._authToken);
				if(!userToken){
					//console.log(`handleOpenOrderCreation -- 4`);
					invalidCode = RESULT_CODE.INVALID_TOKEN;
				}else{
					//console.log(`handleOpenOrderCreation -- 5`);
					invalidCode = await RequestValidator.validateCall(ROUTE, request);
				}
			}catch(e){
				//console.log(`handleOpenOrderCreation -- 6`);
				console.log(e);
				invalidCode = RESULT_CODE.INTERNAL_ERROR;
			}
			
			if(invalidCode === RESULT_CODE.SUCCESS){
				//console.log(`handleOpenOrderCreation -- 7`);
				try{
					//console.log(`handleOpenOrderCreation -- 8`);
					let user = await UserController.one({
						where:{
							id: userToken.user.id
						},
						relations:['funds']
					});
					//console.log(`handleOpenOrderCreation -- 9`);
					let queryDate:Date;
					if(request._payload.datetime){
						//console.log(`handleOpenOrderCreation -- 10`);
						if(new Date(request._payload.datetime).toString().indexOf("Invalid")<0){
							//If provided valid date value
							queryDate = new Date(request._payload.datetime);
						}else{
							//If not valid date value, we query the latest current price on the current timestamp
							queryDate = new Date();
						}
					}else{
						//console.log(`handleOpenOrderCreation -- 11`);
						queryDate = new Date();
					}

					let bitPrice = await LatestPriceController.getLastestPrice(queryDate);

					if(bitPrice && user){
						//console.log(`handleOpenOrderCreation -- 12`);
						let ammountToSubstract = Utils._getSubstractAmmount(request._payload.size, bitPrice.price, request._payload.leverage);
						let currentFunds = user.funds.btc_ammount;
						/**
						 * back-end must check that there is enough btc (margin) on users balance. Calculated
							with formula: margin = users btc – (order size / bitcoin price / leverage). Value must
							be positive to proceed.
						 */
						let margin = currentFunds - ammountToSubstract;
						
						let remainingFunds = Utils.normalizeBitcoinAmmount(currentFunds - ammountToSubstract);
						//console.log(`handleOpenOrderCreation -- 13`);
						if(margin>0){
							//console.log(`handleOpenOrderCreation -- 14`);
							user.funds.btc_ammount = remainingFunds;

							let openOrder = new OpenOrder();
							openOrder.leverage = request._payload.leverage;
							openOrder.order_type = request._payload.order_type;
							openOrder.pair = request._payload.pair;
							openOrder.side = request._payload.side;
							openOrder.stop_price = request._payload.stop_price;
							openOrder.limit_price = request._payload.limit_price;			//TODO: Check on how to get it
							openOrder.dateTime = new Date();
							openOrder.entry_price = bitPrice.price;
							openOrder.limit_price = request._payload.limit_price;
							openOrder.exit_price = request._payload.exit_price;
							openOrder.margin = Utils.normalizeBitcoinMargin(remainingFunds);
							openOrder.size = request._payload.size;					//TODO: Make sure it's the same

							openOrder = await OpenOrderController.create(user, openOrder, bitPrice);

							let openPosition:OpenPosition;
							//console.log(`handleOpenOrderCreation -- 15`);
							if(request._payload.maker_only){
								if(openOrder){
									try{
										let result = await OpenOrderController.upgradeToOpenPosition(openOrder);
										openPosition = result.openPosition;
									}catch(e){
										//Open position not created...
										console.log(`Open position could not be created...`);
										console.log(e);
									}
								}else{
									_resultCode = RESULT_CODE.OPEN_ORDER_NOT_CREATED
								}
							}
							if(openOrder){
								_payload.record = openOrder.toJson();
								if(request._payload.maker_only && !openPosition){
									_resultCode = RESULT_CODE.OPEN_POSITION_NOT_CREATED;
								}else{
									if(request._payload.maker_only && openPosition){
										_payload.openPositon = openPosition.toJson();
									}else{
										socketInstance.server.emit(OPEN_ORDER_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, userToken.user.id+""), openOrder.toJson());
									}
									_resultCode = RESULT_CODE.SUCCESS;
								}
							}else{
								_resultCode = RESULT_CODE.OPEN_ORDER_NOT_CREATED;
							}
						}else{
							//console.log(`handleOpenOrderCreation -- 13 - 2`);
							_resultCode = RESULT_CODE.INSUFFICIENT_FUNDS;
						}
					}else{
						_resultCode = RESULT_CODE.BITCOIN_PRICE_NOT_FOUND;
					}
				}catch(e){
					console.log(e);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}else{
				_resultCode = invalidCode;
			}
		}catch(e){
			console.log(e);
			_resultCode = RESULT_CODE.INTERNAL_ERROR;
		}
		payload = Utils
		.assembleResponsePayload(
			Utils.assembleResponseMeta(request._meta, _resultCode), _payload
		);
		socketInstance.emit(ROUTE, payload);
	}

	/**
	 * @description Handles the request to update open orders
	 * @param socketInstance Instance of the socket calling the method.
	 * @param request Request package to perform the operation.
	 */
	public async handleOpenOrderUpdate(socketInstance: Socket, request: IOpenOrderUpdateRequest){
		let payload:IOpenOrderUpdateResponse;
		const ROUTE = OPEN_ORDER_ROUTES.UPDATE;
		let _payload:IOpenOrderUpdateResponsePayload = {oldRecord: null, newRecord: null};
		let _resultCode: RESULT_CODE;

		try{
			let invalidCode:RESULT_CODE = null;
			let userToken: IToken = null;
			try{
				userToken = await AuthManager.parseToken(request._meta._authToken);
				if(!userToken){
					invalidCode = RESULT_CODE.INVALID_TOKEN;
				}else{
					invalidCode = await RequestValidator.validateCall(ROUTE, request);
				}
			}catch(e){
				invalidCode = RESULT_CODE.INTERNAL_ERROR;
			}
			
			if(invalidCode === RESULT_CODE.SUCCESS){
				try{
					let user = await UserController.one({
						where:{
							id: userToken.user.id
						},
						relations:['funds']
					});
					let openOrder:OpenOrder;
					if(user){
						openOrder = await OpenOrderController.one({
							where:{
								id: request._payload.orderId,
								user: user
							}
						});
					}

					if(openOrder && user){
						let oldRecord = openOrder.toJson();

						let edited:boolean = false;
						if(request._payload.field.exit_price){
							openOrder.exit_price = request._payload.field.exit_price;
							edited = true;
						}
						if(request._payload.field.stop_price){
							openOrder.stop_price = request._payload.field.stop_price;
							edited = true;
						}
						if(edited){
							openOrder = await OpenOrderController.save(openOrder);
						}
						_resultCode = RESULT_CODE.SUCCESS;
						_payload.newRecord = openOrder.toJson();
						_payload.oldRecord = oldRecord;
					}else{
						if(!openOrder){
							_resultCode = RESULT_CODE.OPEN_ORDER_NOT_FOUND;
						}else{
							_resultCode = RESULT_CODE.USER_NOT_FOUND;
						}
					}
				}catch(e){
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}else{
				_resultCode = invalidCode;
			}
		}catch(e){
			_resultCode = RESULT_CODE.INTERNAL_ERROR;
		}
		payload = Utils
		.assembleResponsePayload(
			Utils.assembleResponseMeta(request._meta, _resultCode), _payload
		);
		socketInstance.emit(ROUTE, payload);
	}

	/**
	 * @description Handles the request to search orders
	 * @param socketInstance Instance of the socket calling the method.
	 * @param request Request package to perform the operation.
	 */
	public async handleOpenOrdersFetch(socketInstance:Socket, request:IOpenOrderFetchRequest){
		let payload:IOpenOrderFetchResponse;
		const ROUTE = OPEN_ORDER_ROUTES.FETCH;
		let _payload:IOpenOrderFetchResponsePayload = {records:null};
		let _resultCode: RESULT_CODE;

		try{
			let invalidCode:RESULT_CODE = null;
			let userToken: IToken = null;
			try{
				userToken = await AuthManager.parseToken(request._meta._authToken);
				if(!userToken){
					invalidCode = RESULT_CODE.INVALID_TOKEN;
				}else{
					invalidCode = await RequestValidator.validateCall(ROUTE, request);
				}
			}catch(e){
				invalidCode = RESULT_CODE.INVALID_PAYLOAD;
			}
			
			if(invalidCode === RESULT_CODE.SUCCESS){
				//Process the call.
				try{
					//Update the user profile.
					let user = await UserController.one({
						where:{
							id: userToken.user.id
						},
						select:['id']
					});
					let options:FindManyOptions<OpenOrder> = {
						where:{
							user: user
						}
						,skip: request._payload.skip ? request._payload.skip : 0
						,take: request._payload.limit ? request._payload.limit : 0
					};

					let notAllowedFields = ['user'];	//Fields that are not allowed to be queried...
					if(request._payload.exact && Object.keys(request._payload.exact).length>0){
						Object.keys(request._payload.exact)
						.filter((key)=>{
							return notAllowedFields.indexOf(key) < 0;
						})
						.forEach((key)=>{
							options.where[key] = request._payload.exact[key];
						});
						notAllowedFields.concat(Object.keys(request._payload.exact));
					}
					if(request._payload.like && Object.keys(request._payload.like).length>0){
						Object.keys(request._payload.like)
						.filter((key)=>{
							return notAllowedFields.indexOf(key) < 0;
						})
						.forEach((key)=>{
							options.where[key] = Like(`%${request._payload.like[key]}%`)
						});
						notAllowedFields.concat(Object.keys(request._payload.like))
					}
					if(request._payload.greaterThan){
						Object.keys(request._payload.greaterThan)
						.filter((key)=>{
							return notAllowedFields.indexOf(key) < 0;
						})
						.forEach((key)=>{
							options.where[key] = MoreThan(request._payload.greaterThan[key])
						});
					}
					if(request._payload.lesserThan){
						Object.keys(request._payload.lesserThan)
						.filter((key)=>{
							return notAllowedFields.indexOf(key) < 0;
						})
						.forEach((key)=>{
							options.where[key] = LessThan(request._payload.lesserThan[key])
						});
					}

					if(request._payload.orderBy && request._payload.order){
						options.order = {[request._payload.orderBy]: request._payload.order}
					}
					if(request._payload.includedRel && (request._payload.includedRel.length>0)){
						options.relations = request._payload.includedRel;
					}
					
					let openOrders = await OpenOrderController.all(options);
					
					_resultCode = RESULT_CODE.SUCCESS;
					_payload.records = openOrders.map((element)=>{
						return element.toJson();
					});
				}catch(e){
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}else{
				_resultCode = invalidCode;
			}
		}catch(e){
			_resultCode = RESULT_CODE.INTERNAL_ERROR;
		}
		payload = Utils
		.assembleResponsePayload(
			Utils.assembleResponseMeta(request._meta, _resultCode), _payload
		);
		socketInstance.emit(ROUTE, payload);
	}

	/**
	 * @description Handles the request to perform the Open Order cancellation
	 * @param socketInstance Instance of the socket calling the method.
	 * @param request Request package to perform the operation.
	 */
	public async handleOpenOrderCancel(socketInstance: Socket, request: IOpenOrderCancelRequest){
		const ROUTE = OPEN_ORDER_ROUTES.CANCEL;
		let payload:IOpenOrderCancelResponse;
		let _payload:IOpenOrderCancelResponsePayload = {cancelledOrder: null};
		let _resultCode: RESULT_CODE;

		console.log(`handleOpenOrderCancel-- 1`);

		try{
			let invalidCode:RESULT_CODE = null;
			let userToken: IToken = null;
			try{
				userToken = await AuthManager.parseToken(request._meta._authToken);
				if(!userToken){
					invalidCode = RESULT_CODE.INVALID_TOKEN;
				}else{
					invalidCode = await RequestValidator.validateCall(ROUTE, request);
				}
			}catch(e){
				invalidCode = RESULT_CODE.INVALID_PAYLOAD;
			}
			if(invalidCode === RESULT_CODE.SUCCESS){
				console.log(`handleOpenOrderCancel-- 2`);
				//Process the call.
				try{
					console.log(`handleOpenOrderCancel-- 3`);
					let user = await UserController.one({
						where:{
							id: userToken.user.id
						},
						select:['id'],
						relations:[CN_USER_INCLUDE_REL.funds]
					});
					let openOrder = await OpenOrderController.one({
						where:{
							id: request._payload.orderId,
							user: user
						},
						relations:['price_copy']
					});

					console.log(`handleOpenOrderCancel-- 4`);
					if(user && openOrder){
						try{
							let restoreBitcoinAmmount = Utils._getSubstractAmmount(openOrder.size, openOrder.price_copy.price, openOrder.leverage);
							user.funds.btc_ammount =  Utils.normalizeBitcoinAmmount(user.funds.btc_ammount + restoreBitcoinAmmount);
							
							user = await OpenOrderController.cancel(user, openOrder);

							console.log(`handleOpenOrderCancel-- 5`);
							if(user){
								console.log(`handleOpenOrderCancel-- 5-1`);
								_resultCode = RESULT_CODE.SUCCESS;
								_payload = {funds: user.funds.toJson(), cancelledOrder: openOrder.toJson()};
							}else{
								console.log(`handleOpenOrderCancel-- 5-2`);
								_resultCode = RESULT_CODE.ERROR_CANCELING_ORDER;
							}
						}catch(e){
							console.log(`handleOpenOrderCancel-- 6`);
							_resultCode = RESULT_CODE.ERROR_CANCELING_ORDER;
						}
					}else{
						console.log(`handleOpenOrderCancel-- 7`);
						if(!openOrder){
							console.log(`handleOpenOrderCancel-- 8`);
							_resultCode = RESULT_CODE.OPEN_ORDER_NOT_FOUND;
						}else if(!user){
							console.log(`handleOpenOrderCancel-- 9`);
							_resultCode = RESULT_CODE.USER_NOT_FOUND;
						}
					}
				}catch(e){
					console.log(`handleOpenOrderCancel-- 10`);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}else{
				console.log(`handleOpenOrderCancel-- 11`);
				_resultCode = invalidCode || RESULT_CODE.INVALID_PAYLOAD;
			}
		}catch(e){
			console.log(`handleOpenOrderCancel-- 12`);
			_resultCode = RESULT_CODE.INTERNAL_ERROR;
		}
		payload = Utils
		.assembleResponsePayload(
			Utils.assembleResponseMeta(request._meta, _resultCode), _payload
		);
		socketInstance.emit(ROUTE, payload);
	}
}

export default OpenOrderRouteHandler.Instance;