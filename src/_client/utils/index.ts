import { ISocketRequest, I_requestMeta } from "../interfaces/requests";
import { RESULT_CODE } from "../enums/codes";
import { ORDER_SIDE } from "../enums/order";
import * as moment from 'moment';

export class Utils {
	private static _instance:Utils = new Utils();

	public static get Instance(){
		return this._instance;
	}

	private constructor(){}

	public assembleResponseMeta(_meta: I_requestMeta, code:RESULT_CODE):I_requestMeta{
		return {
			_id: _meta._id,
			_issuedAt: _meta._issuedAt,
			_statusCode: code
		}
	}
	assembleResponsePayload(meta: I_requestMeta, payload:any):ISocketRequest{
		return {
			_meta: meta,
			_payload: payload
		}
	}

	/**
	 * @description Normalizes the fiat ammounts, to 2 decimal floats.
	 * @param ammount The ammount to normalize
	 */
	normalizeFiatAmmount(ammount:number){
		return parseFloat(Number(ammount).toFixed(2));
	}

	/**
	 * @description Normalizes the crypto ammounts, to 8-decimal floats.
	 * @param ammount The ammount to normalize
	 */
	normalizeBitcoinAmmount(ammount:number){
		return parseFloat(Number(ammount).toFixed(8));
	}

	/**
	 * @description Normalizes the crypto ammounts, to 8-decimal floats.
	 * @param ammount The ammount to normalize
	 */
	normalizeBitcoinMargin(ammount:number){
		return parseFloat(Number(ammount).toFixed(4));
	}

	/**
	 * @description Generats a random ID
	 * @param type Type of the ID to be generated. 1: Numerical. 2: String
	 * @param length Length of the ID to be produced.
	 */
	generateRandomID(type:1 | 2, length: number){
		switch(type){
			case 1:	//Numbers
				let numericalId = "";
				while(numericalId.length<length){
					numericalId+=Math.floor(Math.random()*(1*10^length)).toString();
				}
				if(numericalId.length>0){
					numericalId = numericalId.substr(0, length);
				}
				return parseInt(numericalId);
			case 2:	//Letters
				let stringId = "";
				while(stringId.length<length){
					stringId+=Math.floor(Math.random()*(1*10^length)).toString(16);
				}
				if(stringId.length>0){
					stringId = stringId.substr(0, length);
				}
				return stringId;
		}

	}
	
	calculateLiquidationPrice(entryPrice:number, leverage: number){
		return parseFloat(parseFloat((entryPrice - (entryPrice/(leverage ? leverage : 1)/2)).toString()).toFixed(2));
	}

	/**
	 * @description Calculates the profit for the trade when a position moves from a open_position to order_history.
	 * @param currentPrice Current bitcoin price
	 * @param entryPrice Entry price of the order
	 * @param size Size of the order
	 * @param bitcoinPrice Bitcoin Price from the order (when the order is moved to position_history)
	 * @param leverage Leverage of the order
	 */
	getProfit(currentPrice: number, entryPrice: number, size: number, bitcoinPrice: number, leverage: number, opType: ORDER_SIDE){
		if(opType === ORDER_SIDE.LONG){
			return parseFloat(parseFloat(Number(((currentPrice-entryPrice)*(size/bitcoinPrice))/(leverage ? leverage : 1)).toString()).toFixed(4));
		}else{
			return parseFloat(parseFloat(Number(((entryPrice-currentPrice)*(size/bitcoinPrice))/(leverage ? leverage : 1)).toString()).toFixed(4));
		}
	}

	/**
	 * @description Gets the ammount to be substracted/added from/to the users's funds.
	 * @param size Size of the order, in USD.
	 * @param bitcoinPrice Bitcoin price.
	 * @param leverage Leverage multiplier.
	 */
	public _getSubstractAmmount(size:number, bitcoinPrice: number, leverage: number){
		return (size / bitcoinPrice / (leverage ? leverage : 1));
	}

	formatDisplayDate(date:Date){
		return moment(date).format("L LTS");
	}
}

export default Utils.Instance;