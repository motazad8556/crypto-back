import { UID_REPLACEMENT } from "./codes";

export const AUTH_ROUTES = {
	SIGN_UP : "auth::signup",
	SIGN_IN : "auth::signin",
	CHANGE_PASSWORD : "auth::change_password",
	UPDATE_ACCOUNT : "auth::update_account",
	FETCH_ACCOUNT : "auth::fetch_account"
}

export const PRICE_ROUTES = {
	PRICE_UPDATE_XBT : "price::listen::xbt",
	PRICE_GET_XBT : "price::get::xbt"
}

export const OPEN_POSITION_ROUTES = {
	LISTEN_NEW : `open_position::listen::new::${UID_REPLACEMENT}`,
	LISTEN_REMOVED : `open_position::listen::removed::${UID_REPLACEMENT}`,
	LISTEN_CLOSED_AMP : `open_position::listen::closed_amp::${UID_REPLACEMENT}`,
	FETCH : "open_position::fetch",
	UPDATE : "open_position::update",
	CLOSE_AMP : "open_position::close_amp"
}

export const FUND_ROUTES = {
	LISTEN_UPDATED : `funds::listen::updated::${UID_REPLACEMENT}`,
}

export const POSITION_HISTORY_ROUTES = {
	LISTEN_NEW : `position_history::listen::new::${UID_REPLACEMENT}`,
	FETCH : "position_history::fetch"
}

export const DEPOSIT_ROUTES = {
	LISTEN_NEW : `deposit::listen::new::${UID_REPLACEMENT}`,
	CREATE : "deposit::create",
	FETCH : "deposit::fetch"
}

export const OPEN_ORDER_ROUTES = {
	CREATE : "open_order::create",
	LISTEN_NEW : `open_order::listen::new::${UID_REPLACEMENT}`,
	LISTEN_CANCELLED : `open_order::listen::cancelled::${UID_REPLACEMENT}`,
	LISTEN_REMOVED : `open_order::listen::removed::${UID_REPLACEMENT}`,
	LISTEN_UPGRADED_TO_OP : `open_order::listen::upgraded::${UID_REPLACEMENT}`,
	FETCH : "open_order::fetch",
	UPDATE : "open_order::update",
	CANCEL : "open_order::cancel"
}