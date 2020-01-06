import { Socket } from "socket.io";
import { IDepositCreateRequest, IDepositCreateResponse, IDepositCreateResponsePayload, IDepositFetchRequest, IDepositFetchResponse, IDepositFetchResponsePayload } from "../_client/interfaces/requests";
import { DEPOSIT_ROUTES } from "../_client/enums/routes";
import { RESULT_CODE } from "../_client/enums/codes";
import { IToken } from "../_client/interfaces/auth";
import AuthManager from "../manager/Auth";
import RequestValidator from "../manager/RequestValidator";
import UserController from "../controller/User";
import { CN_USER_INCLUDE_REL } from "../_client/enums/columnNames";
import Utils from '../_client/utils';
import { FindManyOptions, Like, MoreThan, LessThan } from "typeorm";
import { Deposit } from "../entity/Deposit";
import DepositController from "../controller/Deposit";

export class DepositRouteHandler {
	private static _instance:DepositRouteHandler = new DepositRouteHandler();
	public static get Instance(){
		return this._instance;
	}
	private constructor(){}

	async handleDepositRequest(socketInstance: Socket, request: IDepositCreateRequest){
		const ROUTE = DEPOSIT_ROUTES.CREATE;
		let payload:IDepositCreateResponse;
		let _payload:IDepositCreateResponsePayload = {newRecord: null, oldFunds: null, newFunds: null};
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
				console.log(`handleDepositRequest-- 2`);
				//Process the call.
				try{
					console.log(`handleDepositRequest-- 3`);
					let user = await UserController.one({
						where:{
							id: userToken.user.id
						},
						select:['id'],
						relations:[CN_USER_INCLUDE_REL.funds]
					});

					if(user && user.funds){
						try{
							let oldFunds = user.funds.toJson();
							//user.funds = await FundsController.save(user.funds);
							let depositResult = await DepositController.makeDeposit(user, request._payload.btc_ammount, request._payload.btc_address);
							//_payload.oldRecord = oldFunds;
							if(depositResult){
								_resultCode = RESULT_CODE.SUCCESS;
								_payload.oldFunds = oldFunds;
								_payload.newFunds = depositResult.newFunds.toJson();
								_payload.newRecord = depositResult.deposit.toJson();
							}else{
								console.log(depositResult);
								_resultCode = RESULT_CODE.ERROR_MAKING_DEPOSIT;	
							}
						}catch(e){
							console.log(`handleDepositRequest-- 6`);
							_resultCode = RESULT_CODE.ERROR_MAKING_DEPOSIT;
						}
					}else{
						console.log(`handleDepositRequest-- 7`);
						_resultCode = RESULT_CODE.USER_NOT_FOUND;
					}
				}catch(e){
					console.log(`handleDepositRequest-- 10`);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}else{
				console.log(`handleDepositRequest-- 11`);
				_resultCode = invalidCode || RESULT_CODE.INVALID_PAYLOAD;
			}
		}catch(e){
			console.log(`handleDepositRequest-- 12`);
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
	public async handleDepositsFetch(socketInstance:Socket, request:IDepositFetchRequest){
		let payload:IDepositFetchResponse;
		const ROUTE = DEPOSIT_ROUTES.FETCH;
		let _payload:IDepositFetchResponsePayload = {records:null};
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
					let options:FindManyOptions<Deposit> = {
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
					try{
						let openOrders = await DepositController.all(options);
						_resultCode = RESULT_CODE.SUCCESS;
						_payload.records = openOrders.map((element)=>{
							return element.toJson();
						});
					}catch(e){
						_resultCode = RESULT_CODE.INTERNAL_ERROR;
					}
				}catch(e){
					console.log(e);
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


}

export default DepositRouteHandler.Instance;