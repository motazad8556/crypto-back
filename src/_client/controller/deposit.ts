import ConnectionManager from '../manager/ConnectionManager';
import { OPEN_ORDER_ROUTES, DEPOSIT_ROUTES } from '../enums/routes';
import { UID_REPLACEMENT } from '../enums/codes';
import { IDepositFetchQuery, IDeposit, IDepositCreateRequestPayload } from '../interfaces/deposit';
import { IDepositCreateResponse, IDepositFetchResponse } from '../interfaces/requests';

export class DepositController {
	private static _Instance:DepositController = new DepositController();
	public static get Instance(){ return this._Instance; }
	private constructor(){}

	/**
	 * @description Creates a new order
	 * @param request Request payload
	 * @param token Authentication JWT
	 */
	async createNewDeposit(request:IDepositCreateRequestPayload, token:string){
		let result = <IDepositCreateResponse> await ConnectionManager.call(DEPOSIT_ROUTES.CREATE, request, token);
		return result;
	}

	async listenNewDepositAdded(uid:number, callback: (order: IDeposit) => void){
		ConnectionManager.listen(DEPOSIT_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, uid+""), callback);
	}

	async fetchDeposits(query: IDepositFetchQuery, token:string):Promise<IDepositFetchResponse>{
		let result = <IDepositFetchResponse> await ConnectionManager.call(OPEN_ORDER_ROUTES.FETCH, query, token);
		return result;
	}
}

export default DepositController.Instance;