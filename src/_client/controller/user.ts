import ConnectionManager from '../manager/ConnectionManager';
import { AUTH_ROUTES } from "../enums/routes";
import { IAccountUpdateRequest,  IAccountFetchRequest } from "../interfaces/user";
import { ISocketAccountUpdateResponse,  ISocketAccountFetchResponse } from "../interfaces/requests";

export class UserController {
	private static _instance: UserController = new UserController();

	private constructor(){

	}

	public static get Instance(){
		return this._instance;
	}

	public async updateAccount(request:IAccountUpdateRequest, token?:string): Promise<ISocketAccountUpdateResponse>{
		let result = <ISocketAccountUpdateResponse> await ConnectionManager
		.call(AUTH_ROUTES.UPDATE_ACCOUNT, request, token);
		return result;
	}
	public async fetchAccount(request: IAccountFetchRequest, token?:string): Promise<ISocketAccountFetchResponse>{
		let result = <ISocketAccountFetchResponse> await ConnectionManager
		.call(AUTH_ROUTES.FETCH_ACCOUNT, request, token);
		return result;
	}

}

export default UserController.Instance;