import ConnectionManager from '../manager/ConnectionManager';
import { FUND_ROUTES } from '../enums/routes';
import { UID_REPLACEMENT } from '../enums/codes';
import { IFunds } from '../interfaces/funds';

export class FundsController {
	private static _Instance:FundsController = new FundsController();
	public static get Instance(){ return this._Instance; }
	private constructor(){}


	async listenFundsUpdated(uid:number, callback: (order: IFunds) => void){
		ConnectionManager.listen(FUND_ROUTES.LISTEN_UPDATED.replace(UID_REPLACEMENT, uid+""), callback);
	}
}

export default FundsController.Instance;