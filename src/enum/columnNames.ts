export const COLUMN_NAME:COLUMN_NAME = {
	OPEN_ORDER: {
		id : "id",
		updatedAt: "updated_at",
		created_at: "created_at",
		status: "status",
		user: "user_id",
		price_copy: "price_copy_id",
		dateTime: "date_time",
		order_type: "order_type",
		pair: "pair",
		size: "size",
		leverage: "leverage",
		margin: "margin",
		side: "side",
		entry_price: "entry_price",
		limit_price: "limit_price",
		stop_price: "stop_price",
		exit_price: "exit_price",
	},
	OPEN_POSITION: {
		id: "id",
		createdAt: "created_at",
		updatedAt: "updated_at",
		status: "status",
		user: "user_id",
		order: "order_id",
		dateTime: "date_time",
		pair: "pair",
		size: "size",
		side: "side",
		entry_price: "entry_price",
		exit_price: "exit_price",
		liquidation_price: "liquidation_price",
		leverage: "leverage",
		margin: "margin",
		stop_price: "stop_price",
		price_copy: "price_copy",
		profit: "profit"
	},
	POSITION_HISTORY: {
		id: "id",
		createdAt: "created_at",
		updatedAt: "updated_at",
		status: "status",
		user: "user_id",
		order: "order_id",
		dateTime: "date_time",
		pair: "pair",
		size: "size",
		side: "side",
		entry_price: "entry_price",
		exit_price: "exit_price",
		liquidation_price: "liquidation_price",
		leverage: "leverage",
		stop_price: "stop_price",
		margin: "margin",
		price_copy: "price_copy",
		profit: "profit"
	},
	PRICE: {
		id: "id",
		createdAt: "created_at",
		updatedAt: "updated_at",
		symbol: "symbol",
		timestamp: "timestamp",
		price: "price",
		_tradeCopy: "trade_copy",
		openPosition: "open_position",
		openOrder: "open_order",
	},
	USER: {
		id: "id",
		createdAt: "created_at",
		updatedAt: "updated_at",
		firstName: "first_name",
		lastName: "last_name",
		username: "username",
		email: "email",
		country: "country",
		photo: "photo",
		auth: "auth"
	},
	DEPOSIT: {
		id: "id",
		createdAt: "createdAt",
		updatedAt: "updatedAt",
		user: "user",
		btc_ammount: "btc_ammount",
		btc_address: "btc_address"
	}
}

type COLUMN_NAME = {
	OPEN_ORDER: {
		id : string,
		updatedAt: string,
		created_at: string,
		status: string,
		user: string,
		price_copy: string,
		dateTime: string,
		order_type: string,
		pair: string,
		size: string,
		leverage: string,
		margin: string,
		side: string,
		entry_price: string,
		limit_price: string,
		exit_price: string,
		stop_price: string
	},
	OPEN_POSITION: {
		id: string,
		createdAt: string,
		updatedAt: string,
		status: string,
		user: string,
		order: string,
		dateTime: string,
		pair: string,
		size: string,
		side: string,
		entry_price: string,
		liquidation_price: string,
		exit_price: string,
		leverage: string,
		margin: string,
		stop_price: string,
		price_copy: string,
		profit: string
	},
	POSITION_HISTORY: {
		id: string,
		createdAt: string,
		updatedAt: string,
		status: string,
		user: string,
		order: string,
		dateTime: string,
		pair: string,
		size: string,
		side: string,
		entry_price: string,
		liquidation_price: string,
		exit_price: string,
		leverage: string,
		margin: string,
		stop_price: string,
		price_copy: string,
		profit: string
	},
	PRICE: {
		id: string
		createdAt: string
		updatedAt: string
		symbol: string
		timestamp: string
		price: string
		_tradeCopy: string
		openPosition: string
		openOrder: string
	},
	USER: {
		id: string
		createdAt: string
		updatedAt: string
		firstName: string
		lastName: string
		username: string
		email: string
		country: string
		photo: string
		auth: string
	},
	DEPOSIT: {
		id: string;
		createdAt: string;
		updatedAt: string;
		user: string;
		btc_ammount: string;
		btc_address: string;
	}
}

export type OPEN_ORDER_COLUMN_NAME =  "id" 
| "updated_at" 
| "created_at" 
| "user_id" 
| "status"
| "price_copy_id" 
| "date_time" 
| "order_type" 
| "pair" 
| "size" 
| "leverage" 
| "margin" 
| "limit_price"
| "exit_price"
| "side" 
| "entry_price"
| "stop_price";

export type OPEN_POSITION_COLUMN_NAME =  "id" 
| "updated_at" 
| "created_at" 
| "user_id" 
| "status"
| "order_id"
| "pair" 
| "order_type" 
| "size" 
| "side"
| "entry_price"
| "liquidation_price"
| "price_copy_id"
| "leverage"
| "date_time"
| "profit"
| "stop_price";

export type POSITION_HISTORY_COLUMN_NAME =  "id" 
| "updated_at" 
| "created_at" 
| "user_id" 
| "status"
| "order_id"
| "pair" 
| "order_type" 
| "size" 
| "side"
| "entry_price"
| "liquidation_price"
| "price_copy_id"
| "leverage"
| "date_time"
| "profit"
| "stop_price";