import { ISocketSignUpRequest, ISocketSignUpResponse, ISocketSignInRequest, ISocketSignInResponse, ISocketChangePasswordRequest, ISocketChangePasswordResponse } from '../_client/interfaces/requests';
import RequestValidator from '../manager/RequestValidator';
import { RESULT_CODE } from '../_client/enums/codes';
import { User } from '../entity/User';
import UserController from '../controller/User';
import { Auth } from '../entity/Auth';
import AuthManager from '../manager/Auth';
import AuthController from '../controller/Auth';
import { AUTH_ROUTES } from '../_client/enums/routes';
import {Socket} from 'socket.io';
import { IToken, ISignInResponse, IChangePasswordResponse } from '../_client/interfaces/auth';
import { Funds } from '../entity/Funds';
import Utils from '../_client/utils';

export class AuthRouteHandler {
	private static _instance: AuthRouteHandler = new AuthRouteHandler();

	private constructor(){}

	public static get Instance(){
		return this._instance;
	}


	/**
	 * 
	 * @description Handles the user sign-up request
	 * @param socketInstance Instance of the socket making the request
	 * @param request The request payload
	 */
	public async handleUserCreationRequest(socketInstance:Socket, request:ISocketSignUpRequest){
		const ROUTE = AUTH_ROUTES.SIGN_UP;
		let invalidCode:RESULT_CODE = null;
		let payload:ISocketSignUpResponse;
		try {

			try{
				invalidCode = await RequestValidator.validateCall(ROUTE, request);
			}catch(e){
				invalidCode = RESULT_CODE.INVALID_PAYLOAD;
			}
			if(invalidCode !== RESULT_CODE.SUCCESS){
				payload = {
					_meta: {
						_id: request._meta._id,
						_issuedAt: request._meta._issuedAt,
						_statusCode: invalidCode
					},
					_payload:{}
				}
			}else{
				//Process the call.
	
				let auth = new Auth();
				auth.salt =  AuthManager.genSalt();
				auth.hash = AuthManager.hashPassword(request._payload.password, auth.salt);
				auth = await AuthController.create(auth);
				
				let user = new User();
				user.auth = auth;
				user.firstName = request._payload.firstName;
				user.lastName = request._payload.lastName;
				user.country = request._payload.country;
				user.email = request._payload.email;
				user.username = request._payload.username;
				user.photo = request._payload.photo ? request._payload.photo : null;

				user.funds = new Funds();
				user.funds.btc_ammount = process.env.DEF_FUNDS ? parseInt(process.env.DEF_FUNDS) : 0;

	
				user = await UserController.create(user);
				user = await UserController.one({
					where:{
						id: user.id
					},
					relations:['funds']
				});
				payload = {
					_meta: {
						_id: request._meta._id,
						_issuedAt: request._meta._issuedAt,
						_statusCode: RESULT_CODE.SUCCESS
					},
					_payload:{
						id: user.id,
						createdAt: user.createdAt.getTime()
					}
				}
			}
		}catch(e){
			console.log(e);
			payload = {
				_meta: {
					_id: request._meta._id,
					_issuedAt: request._meta._issuedAt,
					_statusCode: RESULT_CODE.INTERNAL_ERROR
				},
				_payload:{}
			}
		}
		socketInstance.emit(ROUTE, payload);
	}

	/**
	 * @param socketInstance Instance of the socket making the request
	 * @param request The request payload
	 * @description Handles sign-in requests
	 */
	public async handleUserAuthRequest(socketInstance:Socket, request:ISocketSignInRequest){
		const ROUTE = AUTH_ROUTES.SIGN_IN;
		let payload:ISocketSignInResponse;
		let _payload:ISignInResponse = {authToken:null};
		let _resultCode: RESULT_CODE;

		try{
			let invalidCode:RESULT_CODE = null;
			try{
				invalidCode = await RequestValidator.validateCall(ROUTE, request);
			}catch(e){
				invalidCode = RESULT_CODE.INVALID_PAYLOAD;
			}
			if(invalidCode !== RESULT_CODE.SUCCESS){
				_resultCode = invalidCode;
			}else{
				//Process the call.
				try{
					let user = await UserController.one({
						where:{ email: request._payload.email.trim().toLowerCase() }, 
						select:['id']
					});
					let hasSamePassw = await AuthManager.hasSamePassword(user.id, request._payload.password);
					if(hasSamePassw){
						let authToken = await AuthManager.getJWToken(request._payload.email.trim().toLowerCase());
						_payload = {authToken, id: user.id};
						_resultCode = RESULT_CODE.SUCCESS;
					}else{
						_resultCode = RESULT_CODE.INVALID_PASSWORD;
					}
				}catch(e){
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}
		}catch(e){
			_resultCode = RESULT_CODE.INTERNAL_ERROR;
		}


		payload = Utils .assembleResponsePayload(
			Utils.assembleResponseMeta(request._meta, _resultCode), _payload
		);
		socketInstance.emit(ROUTE, payload);
	}

	/**
	 * @param socketInstance Instance of the socket making the request
	 * @param request The request payload
	 * @description Handles sign-in requests
	 */
	public async handleUserChangePasswordRequest(socketInstance:Socket, request:ISocketChangePasswordRequest){
		const ROUTE = AUTH_ROUTES.CHANGE_PASSWORD;
		let payload:ISocketChangePasswordResponse;
		let _payload:IChangePasswordResponse = {changed:false};
		let _resultCode: RESULT_CODE;

		try{
			let invalidCode:RESULT_CODE = null;
			try{
				invalidCode = await RequestValidator.validateCall(ROUTE, request);
			}catch(e){
				invalidCode = RESULT_CODE.INTERNAL_ERROR;
			}
			
			if(invalidCode !== RESULT_CODE.SUCCESS){
				_resultCode = invalidCode;
			}else{
				//Process the call.
				try{
					let authToken: IToken;
					try{
						authToken = await AuthManager.parseToken(request._meta._authToken);
					}catch(e){
					}

					if(authToken){
						let hasPass = await AuthManager.hasSamePassword(authToken.user.id, request._payload.password);
						if(hasPass){
							await AuthManager.changeUserPassword(authToken.user.id, request._payload.newPassword);
							_payload.changed = true;
							_resultCode = RESULT_CODE.SUCCESS;
						}else{
							_resultCode = RESULT_CODE.INVALID_PASSWORD;
						}
					}else{
						_resultCode = RESULT_CODE.INVALID_TOKEN;
					}
				}catch(e){
					console.log(e);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
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

export default AuthRouteHandler.Instance;