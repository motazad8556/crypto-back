"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codes_1 = require("./codes");
exports.AUTH_ROUTES = {
    SIGN_UP: "auth::signup",
    SIGN_IN: "auth::signin",
    CHANGE_PASSWORD: "auth::change_password",
    UPDATE_ACCOUNT: "auth::update_account",
    FETCH_ACCOUNT: "auth::fetch_account"
};
exports.PRICE_ROUTES = {
    PRICE_UPDATE_XBT: "price::listen::xbt",
    PRICE_GET_XBT: "price::get::xbt"
};
exports.OPEN_POSITION_ROUTES = {
    LISTEN_NEW: "open_position::listen::new::" + codes_1.UID_REPLACEMENT,
    LISTEN_REMOVED: "open_position::listen::removed::" + codes_1.UID_REPLACEMENT,
    LISTEN_CLOSED_AMP: "open_position::listen::closed_amp::" + codes_1.UID_REPLACEMENT,
    FETCH: "open_position::fetch",
    UPDATE: "open_position::update",
    CLOSE_AMP: "open_position::close_amp"
};
exports.FUND_ROUTES = {
    LISTEN_UPDATED: "funds::listen::updated::" + codes_1.UID_REPLACEMENT,
};
exports.POSITION_HISTORY_ROUTES = {
    LISTEN_NEW: "position_history::listen::new::" + codes_1.UID_REPLACEMENT,
    FETCH: "position_history::fetch"
};
exports.DEPOSIT_ROUTES = {
    LISTEN_NEW: "deposit::listen::new::" + codes_1.UID_REPLACEMENT,
    CREATE: "deposit::create",
    FETCH: "deposit::fetch"
};
exports.OPEN_ORDER_ROUTES = {
    CREATE: "open_order::create",
    LISTEN_NEW: "open_order::listen::new::" + codes_1.UID_REPLACEMENT,
    LISTEN_CANCELLED: "open_order::listen::cancelled::" + codes_1.UID_REPLACEMENT,
    LISTEN_REMOVED: "open_order::listen::removed::" + codes_1.UID_REPLACEMENT,
    LISTEN_UPGRADED_TO_OP: "open_order::listen::upgraded::" + codes_1.UID_REPLACEMENT,
    FETCH: "open_order::fetch",
    UPDATE: "open_order::update",
    CANCEL: "open_order::cancel"
};
//# sourceMappingURL=routes.js.map