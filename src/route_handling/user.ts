import { ISocketAccountUpdateRequest, ISocketAccountUpdateResponse, ISocketAccountFetchRequest, ISocketAccountFetchResponse } from '../_client/interfaces/requests';
import RequestValidator from '../manager/RequestValidator';
import { RESULT_CODE } from '../_client/enums/codes';
import { User } from '../entity/User';
import UserController from '../controller/User';
import AuthManager from '../manager/Auth';
import { AUTH_ROUTES } from '../_client/enums/routes';
import {Socket} from 'socket.io';
import { IToken } from '../_client/interfaces/auth';
import { FindOneOptions } from 'typeorm';
import { IAccountUpdateResponse, IAccountMainData } from '../_client/interfaces/user';
import Utils from '../_client/utils';

export class UserRouteHandler {
	private static _instance: UserRouteHandler = new UserRouteHandler();

	private constructor(){}

	public static get Instance(){
		return this._instance;
	}


	public async handleUserAccountUpdate(socketInstance:Socket, request:ISocketAccountUpdateRequest){
		let payload:ISocketAccountUpdateResponse;
		const ROUTE = AUTH_ROUTES.UPDATE_ACCOUNT;
		let _payload:IAccountUpdateResponse = {};
		let _resultCode: RESULT_CODE;

		try{
			let resultCodeA:RESULT_CODE = null;
			let userToken: IToken = null;
			try{
				userToken = await AuthManager.parseToken(request._meta._authToken);
				if(!userToken){
					resultCodeA = RESULT_CODE.INVALID_TOKEN;
				}else{
					resultCodeA = await RequestValidator.validateCall(ROUTE, request);
				}
			}catch(e){
				resultCodeA = RESULT_CODE.INVALID_PAYLOAD;
			}
			
			if(resultCodeA === RESULT_CODE.SUCCESS){
				//Process the call.
				try{
					//Update the user profile.
					let user = await UserController.one({
						where:{
							email: userToken.user.email
						}
					});
					let updatePayload = request._payload;

					user.country = updatePayload.country ? updatePayload.country : user.country;
					user.firstName = updatePayload.firstName ? updatePayload.firstName : user.firstName;
					user.lastName = updatePayload.lastName ? updatePayload.lastName : user.lastName;
					user.username = updatePayload.username ? updatePayload.username : user.username;
					user.photo = updatePayload.photo ? updatePayload.photo : user.photo;
					
					if(updatePayload.password){
						// Update email -- Special proceedure here
					}

					if(updatePayload.email){
						//Update password -- Special Proceedure Here
					}

					await UserController.save(user);

					user = await UserController.one({
						where:{
							id: user.id
						},
						select:['updatedAt']
					});

					_payload.updatedAt =  user.updatedAt.getTime();
					_resultCode = RESULT_CODE.SUCCESS;
				}catch(e){
					console.log(e);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}else{
				_resultCode = resultCodeA;
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


	public async handleUserAccountFetch(socketInstance:Socket, request:ISocketAccountFetchRequest){
		let payload:ISocketAccountFetchResponse;
		const ROUTE = AUTH_ROUTES.FETCH_ACCOUNT;
		let _payload:IAccountMainData = null;
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
					let options:FindOneOptions<User> = {
						where:{
							id: userToken.user.id
						},
						select: <any>request._payload.fields,
						relations: (()=>{
							if(request._payload.relations && request._payload.relations.length>0){
								return request._payload.relations;
							}
							return [];
						})()
					};
					let user = await UserController.one(options);
					if(user){
						_resultCode = RESULT_CODE.SUCCESS;
						_payload = user.toJson()
					}else{
						_resultCode = RESULT_CODE.USER_NOT_FOUND;
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
}

export default UserRouteHandler.Instance;