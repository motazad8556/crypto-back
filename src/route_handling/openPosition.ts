import { Socket } from "socket.io";
import { OPEN_POSITION_ROUTES } from "../_client/enums/routes";
import { RESULT_CODE } from "../_client/enums/codes";
import { IToken } from "../_client/interfaces/auth";
import AuthManager from "../manager/Auth";
import { IOpenPositionFetchResponse, IOpenPositionFetchRequest, IOpenPositionUpdateRequest, IOpenPositionUpdateResponse, IOpenPositionCloseAMPRequest, IOpenPositionCloseAMPResponse, IFetchOpenPositionResponse, IOpenPositionUpdateResponsePayload, IOpenPositionCloseAMPResponsePayload } from "../_client/interfaces/requests";
import RequestValidator from "../manager/RequestValidator";
import UserController from "../controller/User";
import OpenPositionController from "../controller/OpenPosition";
import { Like, MoreThan, LessThan, FindManyOptions } from "typeorm";
import { OpenPosition } from "../entity/OpenPosition";
import LatestPriceController from "../controller/Price";
import { Price } from "../entity/Price";
import { CN_OPEN_POSITION_INCLUDE_REL, CN_USER_INCLUDE_REL } from "../_client/enums/columnNames";
import Utils from '../_client/utils';

export class OpenPositionRouteHandler {
	private static _instance: OpenPositionRouteHandler = new OpenPositionRouteHandler();
	public static get Instance() {
		return this._instance;
	}
	private constructor() { }


	/**
	 * @description Handles the request to search open positions orders
	 * @param socketInstance Instance of the socket calling the method.
	 * @param request Request package to perform the operation.
	 */
	public async handleOpenPositionsFetch(socketInstance: Socket, request: IOpenPositionFetchRequest) {
		let payload: IOpenPositionFetchResponse;
		const ROUTE = OPEN_POSITION_ROUTES.FETCH;
		let _payload:IFetchOpenPositionResponse = {records:null};
		let _resultCode: RESULT_CODE;

		try {
			let invalidCode: RESULT_CODE = null;
			let userToken: IToken = null;
			try {
				userToken = await AuthManager.parseToken(request._meta._authToken);
				if (!userToken) {
					invalidCode = RESULT_CODE.INVALID_TOKEN;
				} else {
					invalidCode = await RequestValidator.validateCall(ROUTE, request);
				}
			} catch (e) {
				invalidCode = RESULT_CODE.INVALID_PAYLOAD;
			}

			if (invalidCode === RESULT_CODE.SUCCESS) {
				//Process the call.
				try {
					//Update the user profile.
					let user = await UserController.one({
						where: {
							id: userToken.user.id
						},
						select: ['id']
					});
					let options: FindManyOptions<OpenPosition> = {
						where: {
							user: user
						}
						, skip: request._payload.skip ? request._payload.skip : 0
						, take: request._payload.limit ? request._payload.limit : 0
						,relations: request._payload.includedRel ? request._payload.includedRel : []
					};

					let notAllowedFields = ['user'];	//Fields that are not allowed to be queried...
					if (request._payload.exact && Object.keys(request._payload.exact).length > 0) {
						Object.keys(request._payload.exact)
							.filter((key) => {
								return notAllowedFields.indexOf(key) < 0;
							})
							.forEach((key) => {
								options.where[key] = request._payload.exact[key];
							});
						notAllowedFields.concat(Object.keys(request._payload.exact));
					}
					if (request._payload.like && Object.keys(request._payload.like).length > 0) {
						Object.keys(request._payload.like)
							.filter((key) => {
								return notAllowedFields.indexOf(key) < 0;
							})
							.forEach((key) => {
								options.where[key] = Like(`%${request._payload.like[key]}%`)
							});
						notAllowedFields.concat(Object.keys(request._payload.like))
					}
					if (request._payload.greaterThan) {
						Object.keys(request._payload.greaterThan)
							.filter((key) => {
								return notAllowedFields.indexOf(key) < 0;
							})
							.forEach((key) => {
								options.where[key] = MoreThan(request._payload.greaterThan[key])
							});
					}
					if (request._payload.lesserThan) {
						Object.keys(request._payload.lesserThan)
							.filter((key) => {
								return notAllowedFields.indexOf(key) < 0;
							})
							.forEach((key) => {
								options.where[key] = LessThan(request._payload.lesserThan[key])
							});
					}

					if (request._payload.orderBy && request._payload.order) {
						options.order = { [request._payload.orderBy]: request._payload.order }
					}


					let openPositions = await OpenPositionController.all(options);

					_resultCode = RESULT_CODE.SUCCESS;
					_payload.records = openPositions.map((element) => {
						return element.toJson();
					});
				} catch (e) {
					console.log(`OpenPositionFetch Error: `, e);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			} else {
				console.log(`OpenPositionFetch Invalid validation payload code: `, invalidCode);
				_resultCode = invalidCode;
			}
		} catch (e) {
			console.log(`OpenPositionFetch Error #2: `, e);
			_resultCode = RESULT_CODE.INTERNAL_ERROR;
		}
		payload = Utils
		.assembleResponsePayload(
			Utils.assembleResponseMeta(request._meta, _resultCode), _payload
		);
		socketInstance.emit(ROUTE, payload);
	}

	/**
	 * @description Handles the request to update open positions
	 * @param socketInstance Instance of the socket calling the method.
	 * @param request Request package to perform the operation.
	 */
	public async handleOpenPositionUpdate(socketInstance: Socket, request: IOpenPositionUpdateRequest) {
		let payload: IOpenPositionUpdateResponse;
		const ROUTE = OPEN_POSITION_ROUTES.UPDATE;
		let _payload:IOpenPositionUpdateResponsePayload = {oldRecord:null, newRecord:null};
		let _resultCode: RESULT_CODE;

		try {
			let invalidCode: RESULT_CODE = null;
			let userToken: IToken = null;
			try {
				userToken = await AuthManager.parseToken(request._meta._authToken);
				if (!userToken) {
					invalidCode = RESULT_CODE.INVALID_TOKEN;
				} else {
					invalidCode = await RequestValidator.validateCall(ROUTE, request);
				}
			} catch (e) {
				invalidCode = RESULT_CODE.INTERNAL_ERROR;
			}

			if (invalidCode === RESULT_CODE.SUCCESS) {
				try {
					let user = await UserController.one({
						where: {
							id: userToken.user.id
						},
						relations: ['funds']
					});
					let openOrder: OpenPosition;
					if (user) {
						openOrder = await OpenPositionController.one({
							where: {
								id: request._payload.positionId,
								user: user
							}
						});
					}

					if (openOrder && user) {
						console.log(`Fields to edit: \n\n`,request._payload.field);

						let oldRecord = openOrder.toJson();
						let edited: boolean = false;
						if (request._payload.field.stop_price) {
							openOrder.stop_price = request._payload.field.stop_price;
							edited = true;
						}
						if (request._payload.field.exit_price) {
							openOrder.exit_price = request._payload.field.exit_price;
							edited = true;
						}
						if (edited) {
							openOrder = await OpenPositionController.save(openOrder);
						}

						_payload = {oldRecord, newRecord: openOrder.toJson()};
						_resultCode = RESULT_CODE.SUCCESS;
					} else {
						if (!openOrder) {
							_resultCode = RESULT_CODE.OPEN_ORDER_NOT_FOUND;
						} else {
							_resultCode = RESULT_CODE.USER_NOT_FOUND;
						}
					}
				} catch (e) {
					console.log(e);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			} else {
				_resultCode = invalidCode;
			}
		} catch (e) {
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
	 * @description Closes the open position at the latest market price
	 * @param socketInstance Instance of the socket calling the method.
	 * @param request Request package to perform the operation.
	 */
	public async handleOpenPositionCloseAMP(socketInstance: Socket, request: IOpenPositionCloseAMPRequest){
		let payload:IOpenPositionCloseAMPResponse;
		const ROUTE = OPEN_POSITION_ROUTES.CLOSE_AMP;
		let _payload:IOpenPositionCloseAMPResponsePayload = {};
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
						select:['id'],
						relations:[CN_USER_INCLUDE_REL.funds]
					});
					let openPosition = await OpenPositionController.one({
						where:{
							id: request._payload.positionId,
							user: user
						},
						relations:[CN_OPEN_POSITION_INCLUDE_REL.price_copy]
					});

					if(user && openPosition){
						try{
							let currentPrice:Price = await LatestPriceController.getLastestPrice(new Date());
							let result = await OpenPositionController.closeToCMP(user, openPosition, currentPrice);
							_resultCode = RESULT_CODE.SUCCESS;
							_payload = {
								historyId: result.history.id,
								funds: result.user.funds.toJson()
							};
						}catch(e){
							_resultCode = RESULT_CODE.ERROR_CLOSING_AMP;
						}
					}else{
						if(!openPosition){
							_resultCode = RESULT_CODE.OPEN_POSITION_NOT_FOUND;
						}else if(!user){
							_resultCode = RESULT_CODE.USER_NOT_FOUND;
						}
					}
				}catch(e){
					console.log(e);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}else{
				_resultCode = invalidCode || RESULT_CODE.INVALID_PAYLOAD;
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

export default OpenPositionRouteHandler.Instance;