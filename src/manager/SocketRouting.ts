import {Socket} from 'socket.io';
import { AUTH_ROUTES, PRICE_ROUTES, OPEN_ORDER_ROUTES, OPEN_POSITION_ROUTES, POSITION_HISTORY_ROUTES, DEPOSIT_ROUTES } from '../_client/enums/routes';
import { ISocketSignUpRequest, ISocketSignInRequest, ISocketAccountUpdateRequest, ISocketAccountFetchRequest, ISocketChangePasswordRequest, ICurrentPriceRequest, IOpenPositionFetchRequest, IOpenOrderCreateRequest, IOpenOrderFetchRequest, IOpenOrderUpdateRequest, IOpenOrderCancelRequest, IOpenPositionUpdateRequest, IOpenPositionCloseAMPRequest, IPositionHistoryFetchRequest, IDepositCreateRequest } from '../_client/interfaces/requests';
import AuthRouteHandler from '../route_handling/auth';
import UserRouteHandler from '../route_handling/user';
import PriceRouteHandler from '../route_handling/price';
import OpenPositionRouteHandler from '../route_handling/openPosition';
import OpenOrderRouteHandler from '../route_handling/OpenOrder';
import PositionHistoryRouteHandler from '../route_handling/positionHistory';
import DepositRouteHandler from '../route_handling/deposit';

export class SocketRoutesManager {
	private static _instance: SocketRoutesManager = new SocketRoutesManager();

	private constructor(){

	}

	public static get Instance(){
		return this._instance;
	}

	/**
	 * @description This method watches for incoming calls to the server from the connected socket.
	 * @param socketInstance Socket instance that got connected to the server.
	 */
	listen(socketInstance:Socket){
		/** HANDLE AUTH. SIGN-UP */
		socketInstance.on(AUTH_ROUTES.SIGN_UP, (request:ISocketSignUpRequest)=>{
			AuthRouteHandler.handleUserCreationRequest(socketInstance, request);
		});
		socketInstance.on(AUTH_ROUTES.SIGN_IN, (request:ISocketSignInRequest)=>{
			AuthRouteHandler.handleUserAuthRequest(socketInstance, request);
		});
		socketInstance.on(AUTH_ROUTES.CHANGE_PASSWORD, (request: ISocketChangePasswordRequest)=>{
			AuthRouteHandler.handleUserChangePasswordRequest(socketInstance, request)
		});
		socketInstance.on(AUTH_ROUTES.UPDATE_ACCOUNT, (request:ISocketAccountUpdateRequest)=>{
			UserRouteHandler.handleUserAccountUpdate(socketInstance, request);
		});
		socketInstance.on(AUTH_ROUTES.FETCH_ACCOUNT, (request:ISocketAccountFetchRequest)=>{
			UserRouteHandler.handleUserAccountFetch(socketInstance, request);
		});
		socketInstance.on(PRICE_ROUTES.PRICE_GET_XBT, (request: ICurrentPriceRequest)=>{
			PriceRouteHandler.handleCurrentPriceRequest(socketInstance, request);
		});
		socketInstance.on(OPEN_ORDER_ROUTES.CREATE, (request: IOpenOrderCreateRequest)=>{
			OpenOrderRouteHandler.handleOpenOrderCreation(socketInstance, request);
		});
		socketInstance.on(OPEN_POSITION_ROUTES.FETCH, (request: IOpenPositionFetchRequest)=>{
			OpenPositionRouteHandler.handleOpenPositionsFetch(socketInstance, request);
		});
		socketInstance.on(OPEN_POSITION_ROUTES.UPDATE, (request: IOpenPositionUpdateRequest)=>{
			OpenPositionRouteHandler.handleOpenPositionUpdate(socketInstance, request);
		});
		socketInstance.on(OPEN_POSITION_ROUTES.CLOSE_AMP, (request: IOpenPositionCloseAMPRequest)=>{
			OpenPositionRouteHandler.handleOpenPositionCloseAMP(socketInstance, request);
		});
		socketInstance.on(OPEN_ORDER_ROUTES.FETCH, (request: IOpenOrderFetchRequest)=>{
			OpenOrderRouteHandler.handleOpenOrdersFetch(socketInstance, request);
		});
		socketInstance.on(OPEN_ORDER_ROUTES.UPDATE, (request: IOpenOrderUpdateRequest)=>{
			OpenOrderRouteHandler.handleOpenOrderUpdate(socketInstance, request);
		});
		socketInstance.on(OPEN_ORDER_ROUTES.CANCEL, (request: IOpenOrderCancelRequest)=>{
			OpenOrderRouteHandler.handleOpenOrderCancel(socketInstance, request);
		});
		socketInstance.on(POSITION_HISTORY_ROUTES.FETCH, (request: IPositionHistoryFetchRequest)=>{
			PositionHistoryRouteHandler.handlePositionHistoryFetch(socketInstance, request);
		});
		socketInstance.on(DEPOSIT_ROUTES.CREATE, (request: IDepositCreateRequest)=>{
			DepositRouteHandler.handleDepositRequest(socketInstance, request);
		});
	}
}

export default SocketRoutesManager.Instance;