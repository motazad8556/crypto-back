import { SYMBOL } from "../enums/symbols";

export interface ILatestPriceRequestBody_bitmex {
	"timestamp": string, 
	"symbol": SYMBOL, 
	"side": string, 
	"size": number, 
	"price": number,
	"tickDirection": string, 
	"trdMatchID": string, 
	"grossValue": number, 
	"homeNotional": number,
	"foreignNotional": number
}

export interface ILatestPriceRequestBody_bitmex_parsed {
	"timestamp": Date, 
	"symbol": string, 
	"side": string, 
	"size": number, 
	"price": number,
	"tickDirection": string, 
	"trdMatchID": string, 
	"grossValue": number, 
	"homeNotional": number,
	"foreignNotional": number
}

export interface ILatestOrdersBody {
	symbol:string,
	asks:number[][],
	bids: number[][]
	timestamp: Date
}

export interface IRealtimeBitmexOrderData {
	action: string,
	table:string,
	data: ILatestOrdersBody[]
}

export interface IPriceRequest {
	symbol: string
}

export interface ILatestTradesData_bitmex {
	action: string,
	table:	string,
	data: ILatestPriceRequestBody_bitmex_parsed[]
}