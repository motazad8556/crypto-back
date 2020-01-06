import { ISocketRequest, IOpenOrderCancelRequest, IPositionHistoryFetchRequest } from "../_client/interfaces/requests";
import { AUTH_ROUTES, PRICE_ROUTES, OPEN_ORDER_ROUTES, OPEN_POSITION_ROUTES, POSITION_HISTORY_ROUTES, DEPOSIT_ROUTES } from "../_client/enums/routes";
import { RESULT_CODE } from "../_client/enums/codes";
import SyntaxValidator from "./SyntaxValidator";
import { ISignUpRequest, ISignInRequest, IChangePasswordRequest } from "../_client/interfaces/auth";
import UserController from "../controller/User";
import { IAccountFetchRequest } from "../_client/interfaces/user";
import { IPriceRequest } from "../_client/interfaces/priceRequest";
import { SYMBOL } from "../_client/enums/symbols";
import { IFetchOpenOrderQuery, IOpenOrderCreateRequestPayload, IOpenOrderUpdateQuery, IOpenOrderCancelQuery } from "../_client/interfaces/openOrder";
import { ORDER_TYPE } from "../_client/enums/order";
import { QUERY_ORDER_DIR } from "../_client/enums/query";
import { IFetchOpenPositionQuery, IOpenPositionUpdateQuery, IOpenPositionCloseAMPQuery } from "../_client/interfaces/openPosition";
import { CN_OPEN_ORDER_INCLUDE_REL, CN_POSITION_HISTORY_INCLUDE_REL } from "../_client/enums/columnNames";
import { IFetchPositionHistoryQuery } from "../_client/interfaces/positionHistory";
import { IDepositCreateRequestPayload } from "../_client/interfaces/deposit";

OPEN_POSITION_ROUTES
export class PayloadValidator {
	private static _instance: PayloadValidator = new PayloadValidator();
	private constructor(){

	}

	public static get Instance(){
		return this._instance;
	}

	public async validateRequestPayload(route: string, payload:any){
		if(route === AUTH_ROUTES.SIGN_UP){
			let reqPayload = <ISignUpRequest>payload;
			if (
				!SyntaxValidator.hasValidEmail(reqPayload.email) ||
				!SyntaxValidator.hasValidPassword(reqPayload.password) ||
				(
					(reqPayload.country && !SyntaxValidator.hasValidCountry(reqPayload.country))
					||
					(reqPayload.firstName && !SyntaxValidator.hasValidFirstName(reqPayload.firstName))
					||
					//(reqPayload.photo && !(reqPayload.photo ? SyntaxValidator.hasValidBase64Image(reqPayload.photo) : true))
					//||
					(reqPayload.lastName && !SyntaxValidator.hasValidLastName(reqPayload.lastName))
				)
			) {
				return false;
			}
			return true;
		}else if(route === AUTH_ROUTES.SIGN_IN){
			let reqPayload = <ISignInRequest>payload;
			if (
				!SyntaxValidator.hasValidEmail(reqPayload.email)
				|| !reqPayload.password
			) {
				return false;
			}
			return true;
		}else if(route === AUTH_ROUTES.UPDATE_ACCOUNT){
			let reqPayload = <ISignUpRequest>payload;
			if (
				(reqPayload.country && !SyntaxValidator.hasValidCountry(reqPayload.country)) ||
				(reqPayload.password && !SyntaxValidator.hasValidPassword(reqPayload.password)) ||
				(reqPayload.email && !SyntaxValidator.hasValidEmail(reqPayload.email)) ||
				(reqPayload.firstName && !SyntaxValidator.hasValidFirstName(reqPayload.firstName)) ||
				(reqPayload.lastName && !SyntaxValidator.hasValidLastName(reqPayload.lastName)) ||
				(reqPayload.photo && (reqPayload.photo ? SyntaxValidator.hasValidBase64Image(reqPayload.photo) : true))
			) {
				return false;
			}
			return true;
		}else if(route === AUTH_ROUTES.CHANGE_PASSWORD){
			let reqPayload = <IChangePasswordRequest>payload;
			if (
				!reqPayload.password || !SyntaxValidator.hasValidPassword(reqPayload.password)
			) {
				return false;
			}
			return true;
		}else if(route === PRICE_ROUTES.PRICE_GET_XBT){
			let reqPayload = <IPriceRequest>payload;
			if (
				!reqPayload.symbol || Object.values(SYMBOL).indexOf(<any>reqPayload.symbol)<0
			) {
				return false;
			}
			return true;
		}else if(route === OPEN_POSITION_ROUTES.FETCH){
			let reqPayload = <IFetchOpenPositionQuery>payload;
			if(
				(typeof(reqPayload.limit) !== "undefined" && typeof(reqPayload.limit) !== "number")
				|| (typeof(reqPayload.skip) !== "undefined" && typeof(reqPayload.skip) !== "number")
				|| (typeof(reqPayload.limit) !== "undefined" && typeof(reqPayload.limit) !== "number")
				|| (typeof(reqPayload.orderBy) !== "undefined" && typeof(reqPayload.orderBy) !== "string")
				|| (typeof(reqPayload.order) !== "undefined" && Object.values(QUERY_ORDER_DIR).indexOf(reqPayload.order)<0)
			){
				return false;
			}
			return true;
		}else if(route === OPEN_POSITION_ROUTES.UPDATE){
			let reqPayload = (<IOpenPositionUpdateQuery>payload);
			if(
				typeof reqPayload.positionId !== "string"
				|| ((typeof reqPayload.field.stop_price !== "undefined") && (isNaN(<any>reqPayload.field.stop_price) || reqPayload.field.stop_price<1))
				|| ((typeof reqPayload.field.exit_price !== "undefined") && (isNaN(<any>reqPayload.field.exit_price) || reqPayload.field.exit_price<1))
			){
				return false;
			}
			return true;
		}else if(route === OPEN_POSITION_ROUTES.CLOSE_AMP){
			let reqPayload = (<IOpenPositionCloseAMPQuery>payload);
			if(
				typeof reqPayload.positionId !== "string"
			){
				return false;
			}
			return true;
		}else if(route === OPEN_ORDER_ROUTES.FETCH){
			let reqPayload = <IFetchOpenOrderQuery>payload;
			if(
				(typeof(reqPayload.limit) !== "undefined" && typeof(reqPayload.limit) !== "number")
				|| (typeof(reqPayload.skip) !== "undefined" && typeof(reqPayload.skip) !== "number")
				|| (typeof(reqPayload.limit) !== "undefined" && typeof(reqPayload.limit) !== "number")
				|| (typeof(reqPayload.orderBy) !== "undefined" && typeof(reqPayload.orderBy) !== "string")
				|| (typeof(reqPayload.order) !== "undefined" && Object.values(QUERY_ORDER_DIR).indexOf(reqPayload.order)<0)
			){
				return false;
			}
			//We evaluate the inluded relationships are valid
			if(reqPayload.includedRel && reqPayload.includedRel.length>0){
				let possibleRels = Object.values(CN_OPEN_ORDER_INCLUDE_REL);
				let invalidRel = reqPayload.includedRel.find((el)=>{
					return possibleRels.indexOf(el)<0;
				});
				if(invalidRel){
					return false;
				}
			}
			return true;
		}else if(route === POSITION_HISTORY_ROUTES.FETCH){
			let reqPayload = <IFetchOpenPositionQuery>payload;
			if(
				(typeof(reqPayload.limit) !== "undefined" && typeof(reqPayload.limit) !== "number")
				|| (typeof(reqPayload.skip) !== "undefined" && typeof(reqPayload.skip) !== "number")
				|| (typeof(reqPayload.limit) !== "undefined" && typeof(reqPayload.limit) !== "number")
				|| (typeof(reqPayload.orderBy) !== "undefined" && typeof(reqPayload.orderBy) !== "string")
				|| (typeof(reqPayload.order) !== "undefined" && Object.values(QUERY_ORDER_DIR).indexOf(reqPayload.order)<0)
			){
				return false;
			}
			//We evaluate the inluded relationships are valid
			if(reqPayload.includedRel && reqPayload.includedRel.length>0){
				let possibleRels = Object.values(CN_POSITION_HISTORY_INCLUDE_REL);
				let invalidRel = reqPayload.includedRel.find((el)=>{
					return possibleRels.indexOf(<any>el)<0;
				});
				if(invalidRel){
					return false;
				}
			}
			return true;
		}else if(route === OPEN_ORDER_ROUTES.CREATE){
			let reqPayload = <IOpenOrderCreateRequestPayload>payload;
			if(
				(isNaN(reqPayload.size) 
					|| isNaN(reqPayload.leverage)
					|| reqPayload.leverage > 100 
					|| reqPayload.leverage < 0
				)
				|| isNaN(reqPayload.stop_price) || reqPayload.stop_price<1
				|| isNaN(reqPayload.exit_price) || reqPayload.exit_price<1
				|| isNaN(reqPayload.size) || reqPayload.size<1
			){
				return false;
			}
			switch(reqPayload.order_type){
				case ORDER_TYPE.LIMIT:
					if(reqPayload.size < 1 || reqPayload.limit_price < 1){
						return false;
					}
				break;
				case ORDER_TYPE.MARKET_ORDER:
					if(reqPayload.size < 1){
						return false;
					}
				break;
			}
			return true;
		}else if(route === OPEN_ORDER_ROUTES.UPDATE){
			let reqPayload = (<IOpenOrderUpdateQuery>payload);
			if(
				typeof reqPayload.orderId !== "string"
				|| ((typeof reqPayload.field.exit_price !== "undefined") && isNaN(<any>reqPayload.field.exit_price) || reqPayload.field.exit_price<1)
				|| ((typeof reqPayload.field.stop_price !== "undefined") && (isNaN(<any>reqPayload.field.stop_price) || reqPayload.field.stop_price<1))
			){
				return false;
			}
			return true;
		}else if(route === OPEN_ORDER_ROUTES.CANCEL){
			let reqPayload = (<IOpenOrderCancelQuery>payload);
			if(
				typeof reqPayload.orderId !== "string"
			){
				return false;
			}
			return true;
		}else if(route === DEPOSIT_ROUTES.CREATE){
			let reqPayload = (<IDepositCreateRequestPayload>payload);
			if(
				typeof reqPayload.btc_address !== "string"
				|| typeof reqPayload.btc_ammount !== "number"
				|| reqPayload.btc_ammount <=0
			){
				return false;
			}
			return true;
		}else if(route === DEPOSIT_ROUTES.FETCH){
			let reqPayload = <IFetchOpenPositionQuery>payload;
			if(
				(typeof(reqPayload.limit) !== "undefined" && typeof(reqPayload.limit) !== "number")
				|| (typeof(reqPayload.skip) !== "undefined" && typeof(reqPayload.skip) !== "number")
				|| (typeof(reqPayload.limit) !== "undefined" && typeof(reqPayload.limit) !== "number")
				|| (typeof(reqPayload.orderBy) !== "undefined" && typeof(reqPayload.orderBy) !== "string")
				|| (typeof(reqPayload.order) !== "undefined" && Object.values(QUERY_ORDER_DIR).indexOf(reqPayload.order)<0)
			){
				return false;
			}
			return true;
		}
		
		return false;
	}

	async validateRequestPayload_logical(route: string, payload:any){
		if(route === AUTH_ROUTES.SIGN_UP){
			let reqPayload = <ISignUpRequest>payload;			
			//Check email doesn't exist.
			let exists = await UserController.count({
				where:{
					email: reqPayload.email
				}
			});
			if(exists > 0){
				return RESULT_CODE.EMAIL_ALREADY_REGISTERED;
			}

			exists = await UserController.count({
				where: {
					username: reqPayload.username
				}
			});
			if(exists > 0){
				return RESULT_CODE.USERNAME_ALREADY_REGISTERED;
			}
			return RESULT_CODE.SUCCESS;
		}
		else if(route === AUTH_ROUTES.SIGN_IN){
			let reqPayload = <ISignInRequest>payload;			
			//Check email doesn't exist.
			let exists = await UserController.count({
				where:{
					email: reqPayload.email
				}
			});
			if(exists < 1){
				return RESULT_CODE.EMAIL_DOES_NOT_EXIST;
			}
			return RESULT_CODE.SUCCESS;
		}
		else{
			return RESULT_CODE.NOT_YET_IMPLEMENTED;
		}
	}
}

export class RequestValidator {
	private static _instance: RequestValidator = new RequestValidator();
	private _payloadValidator: PayloadValidator = PayloadValidator.Instance;

	private constructor(){}

	public static get Instance(){
		return this._instance;
	}


	/**
	 * @description Makes a sanity check and a auth. check to the received payload.
	 */
	public async validateCall(route: string, request: ISocketRequest): Promise<RESULT_CODE> {

		if(!request._meta._id || !request._meta._issuedAt){
			return RESULT_CODE.INVALID_PAYLOAD;
		}
		if(route === AUTH_ROUTES.SIGN_UP){
			//Validate user sign-up request payload.
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, request._payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			let LOGIC_CODE = await this._payloadValidator.validateRequestPayload_logical(route, request._payload);
			return LOGIC_CODE;
		}else if(route === AUTH_ROUTES.SIGN_IN){
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, request._payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			let LOGIC_CODE = await this._payloadValidator.validateRequestPayload_logical(route, request._payload);
			return LOGIC_CODE;
		}else if(route === AUTH_ROUTES.UPDATE_ACCOUNT){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, request._payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === AUTH_ROUTES.CHANGE_PASSWORD){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, request._payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === PRICE_ROUTES.PRICE_GET_XBT){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, request._payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === AUTH_ROUTES.FETCH_ACCOUNT){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IAccountFetchRequest> request._payload;
			if(!payload.fields || payload.fields.length < 1){
				return RESULT_CODE.INVALID_FIELD_AMMOUNT;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === OPEN_ORDER_ROUTES.CREATE){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IOpenOrderCreateRequestPayload> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === OPEN_ORDER_ROUTES.FETCH){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IFetchOpenOrderQuery> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === OPEN_ORDER_ROUTES.UPDATE){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IFetchOpenOrderQuery> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === OPEN_ORDER_ROUTES.CANCEL){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IOpenOrderCancelQuery> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === OPEN_POSITION_ROUTES.FETCH){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IFetchOpenPositionQuery> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === POSITION_HISTORY_ROUTES.FETCH){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IFetchPositionHistoryQuery> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === OPEN_POSITION_ROUTES.UPDATE){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IOpenPositionUpdateQuery> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === OPEN_POSITION_ROUTES.CLOSE_AMP){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IOpenPositionCloseAMPQuery> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === DEPOSIT_ROUTES.CREATE){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IDepositCreateRequestPayload> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}else if(route === DEPOSIT_ROUTES.FETCH){
			if(!request._meta._authToken) return RESULT_CODE.INVALID_TOKEN;
			let payload = <IFetchOpenOrderQuery> request._payload;
			let hasValidPayload = await this._payloadValidator.validateRequestPayload(route, payload);
			if(!hasValidPayload){
				return RESULT_CODE.INVALID_PAYLOAD;
			}
			return RESULT_CODE.SUCCESS;
		}
		return RESULT_CODE.UNKNOWN_ROUTE;
	}
}

export default RequestValidator.Instance;