import { IFunds } from "./funds";
import { CN_USER_INCLUDE_REL } from "../enums/columnNames";

export interface IAccountMainData {
	id: number,
	createdAt: Date,
	updatedAt: Date,
	firstName: string,
	lastName: string,
	username: string,
	email: string,
	country: string,
	funds: IFunds,
	photo?: string	/**		IMAGE FILE ON BASE64	*/
}

export interface IAccountUpdateRequest {
	firstName?: string,
	lastName?: string,
	username?: string,
	email?: string,
	country?: string,
	photo?: string,	/**		IMAGE FILE ON BASE64	*/
	password?: string
}

export interface IAccountUpdateResponse {
	updatedAt?: number
}

export interface IAccountFetchRequest {
	fields:string[],
	relations?:CN_USER_INCLUDE_REL[]
}

export interface IAccountUITable {
	id: number,
	createdAt: Date,
	updatedAt: Date,
	firstName?: string,
	lastName?: string,
	username?: string,
	email: string,
	country?: string,
	photo?: string	/**		IMAGE FILE ON BASE64	*/
}