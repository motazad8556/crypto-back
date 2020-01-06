import { PAIR } from "../enums/symbols";
import { ORDER_TYPE, ORDER_SIDE, OPEN_POSITION_STATUS } from "../enums/order";
import { QUERY_ORDER_DIR } from "../enums/query";
import { CN_OPEN_POSITION, CN_OPEN_POSITION_INCLUDE_REL, CN_POSITION_HISTORY, CN_POSITION_HISTORY_INCLUDE_REL } from "../enums/columnNames";

export interface IPositionHistory {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	user: number;
	dateTime: Date;
	pair: string;
	size: number;
	side: ORDER_SIDE;
	entry_price: number;
	liquidation_price: number;
	leverage: number;
	margin: number;
	stop_price: number;
	exit_price: number;
	profit: number;
}

export interface IPositionHistoryCreateRequest {
	order_type: 		ORDER_TYPE,
	pair:				PAIR,
	side: 				ORDER_SIDE,
	quantity:			number,
	limit_price:		number,
	entry_price:		number,
	leverage:			number,
	maker_only:			boolean,
	stop_price:			number
}

export interface IPositionHistoryCreatePayload {
	order_type: 		ORDER_TYPE,
	datetime: 			Date,
	pair: 				PAIR,
	side: 				ORDER_SIDE,
	quantity: 			number,
	leverage:			number,
	//side:				string,
	stop_price:			number,
	limit_price:		number,
	entry_price:		number,
	maker_only:			boolean
}

export interface IFetchPositionHistoryQuery {
	order: QUERY_ORDER_DIR,
	orderBy: CN_POSITION_HISTORY,
	like?:{
	},
	exact?: {
		id?: string;
		createdAt?: Date;
		updatedAt?: Date;
		user?: number;
		dateTime?: Date;
		pair?: string;
		size?: number;
		side?: ORDER_SIDE;
		entry_price?: number;
		liquidation_price?: number;
		leverage?: number;
		order?: string;
		stop_price?: number;
		profit?: number;
	},
	greaterThan?:{
		createdAt?: Date;
		updatedAt?: Date;
		dateTime?: Date;
		size?: number;
		entry_price?: number;
		liquidation_price?: number;
		leverage?: number;
		stop_price?: number;
		profit?: number;
	},
	lesserThan?:{
		createdAt?: Date;
		updatedAt?: Date;
		dateTime?: Date;
		size?: number;
		entry_price?: number;
		liquidation_price?: number;
		leverage?: number;
		stop_price?: number;
		profit?: number;
	},
	includedRel?: CN_POSITION_HISTORY_INCLUDE_REL[]
	skip: number,
	limit: number
}
export interface IPositionHistoryUpdateQuery {
	field: {
		exit_price?: number,
		stop_price?: number
	},
	positionId: string
}

export interface IPositionHistoryCloseAMPQuery {
	positionId: string
}