//Must Match Searchable Fields on DB Entities

export enum CN_OPEN_ORDER {
	id = "id",
	updatedAt = "updatedAt",
	createdAt = "createdAt",
	status = "status",
	user = "user",
	price_copy = "price_copy",
	dateTime = "dateTime",
	order_type = "order_type",
	pair = "pair",
	size = "size",
	leverage = "leverage",
	margin = "margin",
	side = "side",
	entry_price = "entry_price",
	limit_price = "limit_price"
}

export enum CN_USER_INCLUDE_REL {
	funds = "funds"
}

export enum CN_OPEN_ORDER_INCLUDE_REL {
	user = "user",
	price_copy = "price_copy",
	openPosition = "openPosition"
}

export enum CN_POSITION_HISTORY_INCLUDE_REL {
	user = "user",
	price_copy = "price_copy",
	openPosition = "openPosition"
}

export enum CN_OPEN_POSITION {
	id = "id",
	createdAt = "createdAt",
	status = "status",
	updatedAt = "updatedAt",
	dateTime = "dateTime",
	user = "user",
	order = "order",
	pair = "pair",
	size = "size",
	side = "side",
	entry_price = "entry_price",
	liquidation_price = "liquidation_price",
	stop_price = "stop_price",
	leverage = "leverage",
	profit = "profit",
	price_copy = "price_copy",
}

export enum CN_POSITION_HISTORY {
	id = "id",
	createdAt = "createdAt",
	status = "status",
	updatedAt = "updatedAt",
	dateTime = "dateTime",
	user = "user",
	order = "order",
	pair = "pair",
	size = "size",
	side = "side",
	entry_price = "entry_price",
	liquidation_price = "liquidation_price",
	stop_price = "stop_price",
	leverage = "leverage",
	profit = "profit",
	price_copy = "price_copy",
}

export enum CN_OPEN_POSITION_INCLUDE_REL {
	order = "order",
	user = "user",
	price_copy = "price_copy"
}


export enum CN_DEPOSIT {
	id = "id",
	createdAt = "createdAt",
	updatedAt = "updatedAt",
	btc_ammount = "btc_ammount",
}

export enum CN_DEPOSIT_REL {
	user = "user"
}