import { IPositionHistoryFetchRequest, IPositionHistoryFetchResponse, IPositionHistoryFetchResponsePayload } from '../_client/interfaces/requests';
import RequestValidator from '../manager/RequestValidator';
import { RESULT_CODE } from '../_client/enums/codes';
import AuthManager from '../manager/Auth';
import { POSITION_HISTORY_ROUTES } from '../_client/enums/routes';
import {Socket} from 'socket.io';
import { IToken } from '../_client/interfaces/auth';
import PositionHistoryController from '../controller/PositionHistory';
import { Like, MoreThan, LessThan, FindManyOptions } from 'typeorm';
import UserController from '../controller/User';
import Utils from '../_client/utils';
import { PositionHistory } from '../entity/PositionHistory';

export class PositionHistoryRouteHandler {
	private static _instance: PositionHistoryRouteHandler = new PositionHistoryRouteHandler();

	private constructor(){}

	public static get Instance(){
		return this._instance;
	}
	
	
	public async handlePositionHistoryFetch(socketInstance: Socket, request: IPositionHistoryFetchRequest) {
		let payload: IPositionHistoryFetchResponse;
		const ROUTE = POSITION_HISTORY_ROUTES.FETCH;

		let _payload:IPositionHistoryFetchResponsePayload = {records:null};
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
					let options: FindManyOptions<PositionHistory> = {
						where: {
							user: user
						}
						, skip: request._payload.skip ? request._payload.skip : 0
						, take: request._payload.limit ? request._payload.limit : 0
						, relations: request._payload.includedRel ? request._payload.includedRel : []
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
					if (request._payload.greaterThan && Object.keys(request._payload.greaterThan).length > 0) {
						Object.keys(request._payload.greaterThan)
							.filter((key) => {
								return notAllowedFields.indexOf(key) < 0;
							})
							.forEach((key) => {
								options.where[key] = MoreThan(request._payload.greaterThan[key])
							});
					}
					if (request._payload.lesserThan && Object.keys(request._payload.lesserThan).length > 0) {
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

					let openPositions = await PositionHistoryController.all(options);
					
					_payload.records = openPositions.map((element) => {
						return element.toJson();
					});
					_resultCode = RESULT_CODE.SUCCESS;
				} catch (e) {
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			} else {
				_resultCode = invalidCode || RESULT_CODE.INTERNAL_ERROR;
			}
		} catch (e) {
			_resultCode = RESULT_CODE.INTERNAL_ERROR;
		}
		payload = Utils
		.assembleResponsePayload(
			Utils.assembleResponseMeta(request._meta, _resultCode), _payload
		);
		socketInstance.emit(ROUTE, payload);
	}

}

export default PositionHistoryRouteHandler.Instance;