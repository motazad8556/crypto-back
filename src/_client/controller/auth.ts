import { ISignUpRequest, ISignInRequest, IChangePasswordRequest } from "../interfaces/auth";
import ConnectionManager from '../manager/ConnectionManager';
import { AUTH_ROUTES } from "../enums/routes";
import { ISocketSignUpResponse, ISocketSignInResponse, ISocketChangePasswordResponse } from "../interfaces/requests";

export class AuthController {
	private static _instance: AuthController = new AuthController();

	private constructor(){

	}

	public static get Instance(){
		return this._instance;
	}

	public async signUp(request:ISignUpRequest): Promise<ISocketSignUpResponse>{
		let result = await ConnectionManager.call(AUTH_ROUTES.SIGN_UP, request);
		return result;
	}

	public async signIn(request: ISignInRequest): Promise<ISocketSignInResponse>{
		let result = await ConnectionManager.call(AUTH_ROUTES.SIGN_IN, request);
		return result;
	}

	public async changePassword(request: IChangePasswordRequest, jwt:string): Promise<ISocketChangePasswordResponse>{
		let result = await ConnectionManager.call(AUTH_ROUTES.CHANGE_PASSWORD, request, jwt);
		return result;
	}
}

export default AuthController.Instance;