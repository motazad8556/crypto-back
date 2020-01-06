import { QUERY_ORDER_DIR } from "../enums/query";
import { CN_POSITION_HISTORY, CN_DEPOSIT_REL } from "../enums/columnNames";

export interface IDeposit {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	user: number;
	btc_ammount: number;
	btc_adddress: string;
}

export interface IDepositCreateRequestPayload {
	btc_ammount: number;
	btc_address: string;
}

export interface IDepositFetchQuery {
	order: QUERY_ORDER_DIR,
	orderBy: CN_POSITION_HISTORY,
	like?:{
	},
	exact?: {
		id?: string;
		createdAt?: Date;
		updatedAt?: Date;
		btc_ammount: number;
	},
	greaterThan?:{
		id?: string;
		createdAt?: Date;
		updatedAt?: Date;
		btc_ammount: number;
	},
	lesserThan?:{
		id?: string;
		createdAt?: Date;
		updatedAt?: Date;
		btc_ammount: number;
	},
	includedRel?: CN_DEPOSIT_REL[]
	skip: number,
	limit: number
}