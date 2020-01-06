export enum TABLE_NAME {
	AUTH = 'auth',
	USER = 'user',
	INI_CHECK = "_check"
}

export enum TABLE_FIELD_AUTH {
	id = 'id',
	jwt = 'jwt'
}

export enum TABLE_FIELD_CHECK {
	loaded = 'loaded'
}

/**
 * @description Fields selectable from the client database
 */
export enum TABLE_FIELD_USER {
	id = "id",
	createdAt = "createdAt",
	updatedAt = "updatedAt",
	firstName = "firstName",
	lastName = "lastName",
	username = "username",
	email = "email",
	country = "country",
	photo = "photo"
}

/**
 * @description Fields selectable from the server record
 */
export const FIELD_NAMES_USER_RECORD = {
	id : "id",
	createdAt : "createdAt",
	updatedAt : "updatedAt",
	firstName : "firstName",
	lastName : "lastName",
	username : "username",
	email : "email",
	country : "country",
	photo : "photo"
}