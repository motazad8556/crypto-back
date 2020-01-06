import { PAIR } from "../enums/symbols";
import { ORDER_TYPE, ORDER_SIDE, OPEN_ORDER_STATUS } from "../enums/order";
import { QUERY_ORDER_DIR } from "../enums/query";
import { CN_OPEN_ORDER, CN_OPEN_ORDER_INCLUDE_REL } from "../enums/columnNames";
import { IPrice } from "./price";
import { IOpenPosition } from "./openPosition";

export interface IOpenOrder {
	id: string,
	createdAt: Date,
	updatedAt: Date,
	status: OPEN_ORDER_STATUS,
	user: number,
	openPosition: IOpenPosition,
	dateTime: Date,
	order_type: ORDER_TYPE,
	pair: PAIR,
	size: number,
	leverage: number,
	margin: number,
	side: ORDER_SIDE,
	entry_price: number,
	limit_price: number,
	exit_price: number,
	stop_price: number,
	price_copy: IPrice
}

export interface IOpenOrderCreateRequestPayload {
	order_type: 		ORDER_TYPE,
	datetime: 			Date,
	pair: 				PAIR,
	side: 				ORDER_SIDE,
	size: 				number,
	leverage:			number,
	limit_price:		number,
	entry_price:		number,
	stop_price:			number,
	exit_price:			number,
	maker_only:			boolean
}

export interface IFetchOpenOrderQuery {
	order: QUERY_ORDER_DIR,
	orderBy: CN_OPEN_ORDER,
	like?:{
	},
	exact?: {
		id?: string,
		updatedAt?: Date,
		createdAt?: Date,
		status?: OPEN_ORDER_STATUS,
		user?: number,
		price_copy?: number,
		dateTime?: Date,
		order_type?: ORDER_TYPE,
		pair?: PAIR,
		size?: number,
		leverage?: number,
		margin?: number,
		side?: ORDER_SIDE,
		entry_price?: number,
		limit_price?: number
	},
	greaterThan?:{
		updatedAt?: Date,
		createdAt?: Date,
		dateTime?: Date,
		price_copy?: number,
		size?: number,
		leverage?: number,
		margin?: number,
		entry_price?: number,
		limit_price?: number
	},
	lesserThan?:{
		updatedAt?: Date,
		createdAt?: Date,
		dateTime?: Date,
		price_copy?: number,
		size?: number,
		leverage?: number,
		margin?: number,
		entry_price?: number,
		limit_price?: number
	},
	includedRel?: CN_OPEN_ORDER_INCLUDE_REL[]
	skip: number,
	limit: number
}

export interface IOpenOrderCancelQuery {
	orderId: string
}

export interface IOpenOrderUpdateQuery {
	field: {
		exit_price?: number,
		stop_price?: number
	},
	orderId: string
}