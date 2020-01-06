import { ISignUpRequest, ISignUpResponse, ISignInRequest, ISignInResponse, IChangePasswordResponse, IChangePasswordRequest } from "./auth";
import { RESULT_CODE } from "../enums/codes";
import { IAccountUpdateRequest, IAccountUpdateResponse, IAccountFetchRequest, IAccountMainData } from "./user";
import { IPrice } from "./price";
import { IPriceRequest } from './priceRequest';
import { IOpenOrder, IOpenOrderCreateRequestPayload, IFetchOpenOrderQuery, IOpenOrderUpdateQuery, IOpenOrderCancelQuery } from "./openOrder";
import { IOpenPosition, IFetchOpenPositionQuery, IOpenPositionUpdateQuery, IOpenPositionCloseAMPQuery } from "./openPosition";
import { IFunds } from "./funds";
import { IFetchPositionHistoryQuery, IPositionHistory } from "./positionHistory";
import { IDeposit, IDepositCreateRequestPayload, IDepositFetchQuery } from "./deposit";


export interface I_requestMeta {
	_id: string,
	_issuedAt: number,
	_authToken?: string,			/** The token the user might use to connect to server*/
	_statusCode?: RESULT_CODE		/** Present is it's on response data */
}

export interface ISocketRequest {
	_meta:I_requestMeta,
	_payload: any
}

export interface ISocketResponse {
	_meta: I_requestMeta,
	_payload: any
}

export interface ISocketSignUpRequest {
	_meta:I_requestMeta,
	_payload: ISignUpRequest
}

export interface ISocketSignUpResponse {
	_meta:I_requestMeta,
	_payload: ISignUpResponse
}

export interface ISocketSignInRequest {
	_meta:I_requestMeta,
	_payload: ISignInRequest
}

export interface ISocketSignInResponse {
	_meta:I_requestMeta,
	_payload: ISignInResponse
}

export interface ISocketChangePasswordRequest {
	_meta:I_requestMeta,
	_payload: IChangePasswordRequest
}

export interface ISocketChangePasswordResponse {
	_meta:I_requestMeta,
	_payload: IChangePasswordResponse
}

export interface ICurrentPriceRequest {
	_meta:I_requestMeta,
	_payload: IPrice
}

export interface ICurrentPriceResponse {
	_meta:I_requestMeta,
	_payload: IPrice
}

export interface ISocketAccountUpdateRequest {
	_meta: I_requestMeta,
	_payload: IAccountUpdateRequest
}

export interface ISocketAccountUpdateResponse {
	_meta:I_requestMeta,
	_payload:	IAccountUpdateResponse
}

export interface ISocketAccountFetchRequest {
	_meta: I_requestMeta,
	_payload: IAccountFetchRequest
}

export interface ISocketAccountFetchResponse {
	_meta:I_requestMeta,
	_payload: IAccountMainData
}

export interface IOpenOrderCreateRequest {
	_meta: I_requestMeta,
	_payload: IOpenOrderCreateRequestPayload
}

export interface IOpenOrderCreateResponsePayload {
	record: IOpenOrder,
	openPositon?: IOpenPosition
}

export interface IOpenOrderCreateResponse {
	_meta: I_requestMeta,
	_payload: IOpenOrderCreateResponsePayload
}

export interface IOpenPositionFetchRequest {
	_meta: I_requestMeta,
	_payload: IFetchOpenPositionQuery
}

export interface IFetchOpenPositionResponse {
	records: IOpenPosition[]
}

export interface IOpenPositionFetchResponse {
	_meta: I_requestMeta,
	_payload: IFetchOpenPositionResponse
}

//Cancel Open Order

export interface IOpenOrderCancelResponsePayload {
	funds?: IFunds,
	cancelledOrder: IOpenOrder
}

export interface IOpenOrderCancelRequest {
	_meta: I_requestMeta,
	_payload: IOpenOrderCancelQuery
}

export interface IOpenOrderCancelResponse {
	_meta: I_requestMeta,
	_payload: IOpenOrderCancelResponsePayload
}

//Fetch Open Order

export interface IOpenOrderFetchRequest {
	_meta: I_requestMeta,
	_payload: IFetchOpenOrderQuery
}

export interface IOpenOrderFetchResponsePayload {
	records: IOpenOrder[]
}

export interface IOpenOrderFetchResponse {
	_meta: I_requestMeta,
	_payload: IOpenOrderFetchResponsePayload
}

//Update Open Order

export interface IOpenOrderUpdateResponsePayload {
	oldRecord: IOpenOrder,
	newRecord: IOpenOrder
}

export interface IOpenOrderUpdateRequest {
	_meta: I_requestMeta,
	_payload: IOpenOrderUpdateQuery
}

export interface IOpenOrderUpdateResponse {
	_meta: I_requestMeta,
	_payload: IOpenOrderUpdateResponsePayload
}

// Update Open Position

export interface IOpenPositionUpdateResponsePayload {
	oldRecord: IOpenPosition,
	newRecord: IOpenPosition
}

export interface IOpenPositionUpdateRequest {
	_meta: I_requestMeta,
	_payload: IOpenPositionUpdateQuery
}

export interface IOpenPositionUpdateResponse {
	_meta: I_requestMeta,
	_payload: IOpenPositionUpdateResponsePayload
}

//Close open position at market price
export interface IOpenPositionCloseAMPResponsePayload {
	historyId?: string,
	funds?: IFunds
}

export interface IOpenPositionCloseAMPRequest {
	_meta: I_requestMeta,
	_payload: IOpenPositionCloseAMPQuery
}

export interface IOpenPositionCloseAMPResponse {
	_meta: I_requestMeta,
	_payload: IOpenPositionCloseAMPResponsePayload
}

// Fetch Open Positions


export interface IPositionHistoryFetchRequest {
	_meta: I_requestMeta,
	_payload: IFetchPositionHistoryQuery
}

export interface IPositionHistoryFetchResponsePayload {
	records: IPositionHistory[]
}

export interface IPositionHistoryFetchResponse {
	_meta: I_requestMeta,
	_payload: IPositionHistoryFetchResponsePayload
}

// Deposit Creation


export interface IDepositCreateRequest {
	_meta: I_requestMeta,
	_payload: IDepositCreateRequestPayload
}

export interface IDepositCreateResponse {
	_meta: I_requestMeta,
	_payload: IDepositCreateResponsePayload
}

export interface IDepositCreateResponsePayload {
	oldFunds: IFunds,
	newFunds: IFunds,
	newRecord: IDeposit
}

// Deposit Fetch

export interface IDepositFetchRequest {
	_meta: I_requestMeta,
	_payload: IDepositFetchQuery
}

export interface IDepositFetchResponsePayload {
	records: IDeposit[]
}

export interface IDepositFetchResponse {
	_meta: I_requestMeta,
	_payload: IDepositFetchResponsePayload
}