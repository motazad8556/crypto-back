import { IAccountMainData } from "./user";
import { AUTH_STATE_CHANGE } from '../enums/codes';

export interface ISignUpRequest {
	firstName?: string,
	lastName?: string,
	username: string,
	email: string,
	country?: string,
	photo?: string,	/**		IMAGE FILE ON BASE64	*/
	password: string
}

export interface ISignUpResponse {
	id?: number,
	createdAt?: number
}

export interface ISignInRequest {
	email: string,
	password: string
}

export interface ISignInResponse {
	id?: number,
	authToken: string
}

export interface IChangePasswordResponse {
	changed: boolean
}

export interface IToken {
	user:IAccountMainData
}

export interface IAuthSchema {
	"jwt":string,
	"id": number
}

export interface IChangePasswordRequest {
	password: string,
	newPassword: string
}


export interface IAuthEvent {
	event: AUTH_STATE_CHANGE, 
	data:any
}