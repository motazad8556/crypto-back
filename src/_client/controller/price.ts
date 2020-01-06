import ConnectionManager from '../manager/ConnectionManager';
import { PRICE_ROUTES } from "../enums/routes";
import { SYMBOL } from '../enums/symbols';
import { IPrice } from '../interfaces/price';
import { EventEmitter } from 'events';
import { IPriceRequest } from '../interfaces/priceRequest';

export class PriceController {
	private static _instance: PriceController = new PriceController();
	private _callbacks:{[id:string]:{emitter:EventEmitter}} = {};
	private _price:{[id:string]:IPrice} = {};

	private constructor(){
		
	}

	public static get Instance(){
		return this._instance;
	}

	public get price(){
		return this._price;
	}

	public getRoute(symbol:SYMBOL){
		if(symbol === SYMBOL.XBT){
			return PRICE_ROUTES.PRICE_UPDATE_XBT;
		}
		return null;
	}

	public getRequestRoute(symbol:SYMBOL){
		if(symbol === SYMBOL.XBT){
			return PRICE_ROUTES.PRICE_GET_XBT;
		}
		return null;
	}

	public listenToPrice(symbol:SYMBOL, token?:string) {
		if(this._callbacks[symbol]){
			return this._callbacks[symbol].emitter;
		}
		this._callbacks[symbol] = {emitter: new EventEmitter()};
		let handler = (payload:IPrice)=>{
			payload.createdAt = new Date(payload.createdAt);
			payload.updatedAt = new Date(payload.updatedAt);
			payload.timestamp = new Date(payload.timestamp);
			this._price[payload.symbol] = payload;
			if(this._callbacks[symbol]){
				this._callbacks[symbol].emitter.emit(symbol, payload);
			}else{
				ConnectionManager.unlisten(symbol, handler);
			}
		}
		ConnectionManager.listen(this.getRoute(symbol), handler);
		return this._callbacks[symbol].emitter;
	}

	public unlistenToPrice(symbol:SYMBOL, listener?: (...args: any[]) => void){
		if(listener){
			this._callbacks[symbol].emitter.removeListener(symbol, listener)
		}else{
			this._callbacks[symbol].emitter.removeAllListeners();
			delete this._callbacks[symbol];
		}
	}

	public async getCurrentPrice(symbol:SYMBOL, token:string, getCached?:boolean){
		if(getCached && this.price[symbol]){
			return this.price[symbol] ? this.price[symbol] : null;
		}

		let payload:IPriceRequest = {
			symbol
		}
		
		let result = await ConnectionManager.call(this.getRequestRoute(symbol), payload, token);
		if(result._payload){
			this.price[symbol] = <IPrice>result._payload;
		}
		return this.price[symbol] ? this.price[symbol] : null;
	}

}

export default PriceController.Instance;