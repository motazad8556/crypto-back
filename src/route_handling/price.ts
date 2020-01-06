import { ICurrentPriceRequest } from '../_client/interfaces/requests';
import RequestValidator from '../manager/RequestValidator';
import { RESULT_CODE } from '../_client/enums/codes';
import PriceController from '../controller/Price';
import AuthManager from '../manager/Auth';
import { PRICE_ROUTES } from '../_client/enums/routes';
import {Socket} from 'socket.io';
import { IToken } from '../_client/interfaces/auth';
import { Price } from '../entity/Price';
import Utils from '../_client/utils';
import { IPrice } from '../_client/interfaces/price';

export class PriceRouteHandler {
	private static _instance: PriceRouteHandler = new PriceRouteHandler();

	private constructor(){}

	public static get Instance(){
		return this._instance;
	}


	public async handleCurrentPriceRequest(socketInstance:Socket, request:ICurrentPriceRequest){
		let payload:ICurrentPriceRequest;
		const ROUTE = PRICE_ROUTES.PRICE_GET_XBT;

		let _payload:IPrice = null;
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
					let price:Price = await PriceController.one({
						where:{
							symbol: request._payload.symbol,
							_tradeCopy: false
						}
					});

					_payload = price.toJson();
					_resultCode = RESULT_CODE.SUCCESS;
				}catch(e){
					console.log(e);
					_resultCode = RESULT_CODE.INTERNAL_ERROR;
				}
			}else{
				_resultCode = invalidCode;
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

}

export default PriceRouteHandler.Instance;