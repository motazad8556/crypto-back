import { RESULT_CODE, SUCCESS_UI, UI_RESULT_CODE } from './codes';

export const ERROR_MESSAGES:{[index:number]:{title:string, message:string}} = {
	[RESULT_CODE.ERROR_MAKING_DEPOSIT]:{
		title: "Error making the deposit",
		message: "The has been an error making the deposit. Please try again later."
	},
	[RESULT_CODE.OPEN_ORDER_NOT_CREATED]:{
		title: "Error creating open order",
		message: "There has been an error creating the open order. Please try again later."
	},
	[RESULT_CODE.ERROR_CLOSING_AMP]:{
		title: "Error closing the open positions",
		message: "There has been errors creating the open position. Please try again later."
	},
	[RESULT_CODE.OPEN_POSITION_NOT_CREATED]:{
		title: "Error creating open positions",
		message: "There has been an error creating the open position. Please try again later"
	},
	[RESULT_CODE.ERROR_CANCELING_ORDER]:{
		title: "Error cancelling order",
		message: "There has been an error cancelling your order. Please try again later."
	},
	[RESULT_CODE.UNKNOWN_ROUTE]:{
		title: "Internal Error: Unknown Route",
		message: "There has been an error into our server. Please try again later."
	},
	[RESULT_CODE.OPEN_POSITION_NOT_FOUND]:{
		title: "Open position not found",
		message: "The open position has not been found in our servers. Please try again later."
	},
	[RESULT_CODE.BITCOIN_PRICE_NOT_FOUND]:{
		title: "Bitcoin Price not Found",
		message: "The bitcoin price has not yet been loaded into our system. Please try again later."
	},
	[RESULT_CODE.USER_NOT_FOUND]:{
		title: "User not found",
		message: "The user who holds this identifier has not been found. Please log-out and log-in again."
	},
	[RESULT_CODE.USER_NOT_FOUND]:{
		title: "The order has not been found",
		message: "The order you're acting upon has not been found in our servers. Please try again later."
	},
	[RESULT_CODE.NOT_YET_IMPLEMENTED]:{
		title: "Not yet implemented",
		message: "This functionality has not yet been implemented."
	},
	[RESULT_CODE.INVALID_TOKEN]:{
		title: "Invalid Authentication",
		message: "Your authentication information has expired. Please sign-in again."
	},
	[RESULT_CODE.INVALID_PAYLOAD]:{
		title: "Request Error",
		message: `There was an error with your request (${RESULT_CODE.INVALID_PAYLOAD}). Please try again later.`
	},
	[RESULT_CODE.EMAIL_ALREADY_REGISTERED]:{
		title: "Email already exists",
		message: "This email has already been registered in our platform. Please try again with a different email"
	},
	[RESULT_CODE.USERNAME_ALREADY_REGISTERED]:{
		title: "Username already exists",
		message: "This username has already been registered in our platform. Please try again with a different email"
	},
	[RESULT_CODE.EMAIL_DOES_NOT_EXIST]:{
		title: "This email does not exist.",
		message: "This email does not exist or is not registered in our platform. Please verify it and try again later."
	},
	[RESULT_CODE.INVALID_PASSWORD]:{
		title: "Wrong Password",
		message: "This password does not match the one registered with this account. Please try again later."
	},
	[RESULT_CODE.INVALID_FIELD_AMMOUNT]:{
		title: "Request Error",
		message: `There was an error with your request (${RESULT_CODE.INVALID_FIELD_AMMOUNT}). Please try again later.`
	},
	[RESULT_CODE.INTERNAL_ERROR]:{
		title: "Server Error",
		message: `There has been an internal error (${RESULT_CODE.INTERNAL_ERROR}). Please try again later.`
	},
	[RESULT_CODE.INSUFFICIENT_FUNDS]:{
		title: "Insufficient balance to place order",
		message: `The user does not have enough funds to place this order.`
	}
};

export const SUCCESS_MESSAGES:{[index:number]:{title:string, message:string}} = {
	[SUCCESS_UI.CREATED_ACCOUNT]:{
		title: "User Created",
		message: "Your user has been created. You'll be redirected to your profile page."
	},
	[SUCCESS_UI.LOGGED_IN]:{
		title: "Logged In",
		message: "Successfully Logged In"
	},
	[SUCCESS_UI.CHANGED_PASSWORD]:{
		title: "Changed Password",
		message: "Successfully Changed your Password!"
	},
	[SUCCESS_UI.ADDED_OPEN_ORDER]:{
		title: "Added New Order",
		message: "Added new order successfully"
	},
	[SUCCESS_UI.ADDED_OPEN_POSITION]:{
		title: "Added New Open Position",
		message: "Added new open position successfully"
	},
	[SUCCESS_UI.CANCELLED_OPEN_ODER]:{
		title: "Cancelled Open Order",
		message: "Cancelled Open Order Successfully"
	},
	[SUCCESS_UI.CLOSED_OO_AMP]:{
		title: "Closed Open Position",
		message: "Closed Current Open Position at Market Price"
	},
	[SUCCESS_UI.DEPOSIT_MADE]:{
		title: "Deposit Made",
		message: "The deposit has been correctly executed."
	}
}

export const UI_ERROR_CODES:{[index:number]:{title:string, message:string}} = {
	[UI_RESULT_CODE.INVALID_DATA]: {
		title: "Invalid Data",
		message: "The data you have introduced is invalid. Please verify it and try again."
	},
	[UI_RESULT_CODE.PROFILE_IMAGE_TOO_BIG]: {
		title: "Image Too Big",
		message: `The image file size is too big. Must not be bigger than _MAX_PROFILE_IMAGE_SIZE_ mb.`
	},
}