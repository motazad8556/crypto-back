import ConnectionManager from '../manager/ConnectionManager';
import { IOpenPositionFetchResponse, IOpenOrderCreateResponse, IOpenOrderFetchResponse, IOpenOrderUpdateResponse, IOpenOrderCancelResponse, IOpenPositionUpdateResponse, IOpenPositionCloseAMPResponse, IPositionHistoryFetchResponse } from '../interfaces/requests';
import { OPEN_ORDER_ROUTES, OPEN_POSITION_ROUTES, POSITION_HISTORY_ROUTES } from '../enums/routes';
import { IOpenOrderCreateRequestPayload, IFetchOpenOrderQuery, IOpenOrderUpdateQuery, IOpenOrderCancelQuery, IOpenOrder } from '../interfaces/openOrder';
import { IFetchOpenPositionQuery, IOpenPositionUpdateQuery, IOpenPositionCloseAMPQuery, IOpenPosition } from '../interfaces/openPosition';
import { IFetchPositionHistoryQuery, IPositionHistory } from '../interfaces/positionHistory';
import { UID_REPLACEMENT } from '../enums/codes';

export class OrderController {
	private static _Instance:OrderController = new OrderController();
	public static get Instance(){ return this._Instance; }
	private constructor(){}

	/**
	 * @description Creates a new order
	 * @param request Request payload
	 * @param token Authentication JWT
	 */
	async createNewOrder(request:IOpenOrderCreateRequestPayload, token:string){
		let result = <IOpenOrderCreateResponse> await ConnectionManager.call(OPEN_ORDER_ROUTES.CREATE, request, token);
		return result;
		//return result;
	}

	async listenNewOrderAdded(uid:number, callback: (order: IOpenOrder) => void){
		console.log(`Listening to: `,OPEN_ORDER_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, uid+""));
		ConnectionManager.listen(OPEN_ORDER_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, uid+""), callback);
	}

	async listenOpenOrderCancelled(uid:number, callback: (order: IOpenOrder) => void){
		ConnectionManager.listen(OPEN_ORDER_ROUTES.LISTEN_CANCELLED.replace(UID_REPLACEMENT, uid+""), callback);
	}

	async listenOpenOrderRemoved(uid:number, callback: (order: IOpenOrder) => void){
		ConnectionManager.listen(OPEN_ORDER_ROUTES.LISTEN_REMOVED.replace(UID_REPLACEMENT, uid+""), callback);
	}

	/**
	 * @description Listens for order-upgrade events on the users' account
	 * @param uid UID for the user
	 * @param callback Callback
	 */
	async listenOpenOrderUpgraded(uid:number, callback: (order: IOpenOrder) => void){
		ConnectionManager.listen(OPEN_ORDER_ROUTES.LISTEN_UPGRADED_TO_OP.replace(UID_REPLACEMENT, uid+""), callback);
	}

	async listenNewOpenPositionAdded(uid:number, callback: (order: IOpenPosition) => void){
		console.log(`FrontEnd Listening: ${OPEN_POSITION_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, uid+"")}`);
		ConnectionManager.listen(OPEN_POSITION_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, uid+""), callback);
	}

	async listenOpenPositionRemoved(uid:number, callback: (order: IOpenPosition) => void){
		console.log(`FrontEnd Listening: ${OPEN_POSITION_ROUTES.LISTEN_REMOVED.replace(UID_REPLACEMENT, uid+"")}`);
		ConnectionManager.listen(OPEN_POSITION_ROUTES.LISTEN_REMOVED.replace(UID_REPLACEMENT, uid+""), callback);
	}

	async listenOpenPositionClosedAMP(uid:number, callback: (order: IOpenPosition) => void){
		console.log(`FrontEnd Listening to: ${OPEN_POSITION_ROUTES.LISTEN_CLOSED_AMP.replace(UID_REPLACEMENT, uid+"")}`);
		ConnectionManager.listen(OPEN_POSITION_ROUTES.LISTEN_CLOSED_AMP.replace(UID_REPLACEMENT, uid+""), callback);
	}

	async listenNewOrderHistoryAdded(uid:number, callback: (order: IPositionHistory) => void){
		console.log(`listenNewOrderHistoryAdded --> FrontEnd Listening to: ${POSITION_HISTORY_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, uid+"")}`);
		ConnectionManager.listen(POSITION_HISTORY_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, uid+""), callback);
	}

	async fetchOpenOrders(query: IFetchOpenOrderQuery, token:string):Promise<IOpenOrderFetchResponse>{
		let result = <IOpenOrderFetchResponse> await ConnectionManager.call(OPEN_ORDER_ROUTES.FETCH, query, token);
		return result;
	}

	async updateOpenOrder(query: IOpenOrderUpdateQuery, token:string){
		let result = <IOpenOrderUpdateResponse> await ConnectionManager.call(OPEN_ORDER_ROUTES.UPDATE, query, token);
		return result;
	}

	async cancelOpenOrder(query: IOpenOrderCancelQuery, token:string){
		let result = <IOpenOrderCancelResponse> await ConnectionManager.call(OPEN_ORDER_ROUTES.CANCEL, query, token);
		return result;
	}
	
	async fetchOpenPositions(query: IFetchOpenPositionQuery, token:string):Promise<IOpenPositionFetchResponse>{
		let result = <IOpenPositionFetchResponse> await ConnectionManager.call(OPEN_POSITION_ROUTES.FETCH, query, token);
		return result;
	}

	async updateOpenPosition(query: IOpenPositionUpdateQuery, token:string){
		let result = <IOpenPositionUpdateResponse> await ConnectionManager.call(OPEN_POSITION_ROUTES.UPDATE, query, token);
		return result;
	}

	async closeOpenPositionAtMarketPrice(query: IOpenPositionCloseAMPQuery, token:string){
		let result = <IOpenPositionCloseAMPResponse> await ConnectionManager.call(OPEN_POSITION_ROUTES.CLOSE_AMP, query, token);
		return result;
	}
	
	async fetchPositionHistory(query: IFetchPositionHistoryQuery, token:string):Promise<IPositionHistoryFetchResponse>{
		let result = <IPositionHistoryFetchResponse> await ConnectionManager.call(POSITION_HISTORY_ROUTES.FETCH, query, token);
		return result;
	}
}

export default OrderController.Instance;