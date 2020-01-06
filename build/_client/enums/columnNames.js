"use strict";
//Must Match Searchable Fields on DB Entities
Object.defineProperty(exports, "__esModule", { value: true });
var CN_OPEN_ORDER;
(function (CN_OPEN_ORDER) {
    CN_OPEN_ORDER["id"] = "id";
    CN_OPEN_ORDER["updatedAt"] = "updatedAt";
    CN_OPEN_ORDER["createdAt"] = "createdAt";
    CN_OPEN_ORDER["status"] = "status";
    CN_OPEN_ORDER["user"] = "user";
    CN_OPEN_ORDER["price_copy"] = "price_copy";
    CN_OPEN_ORDER["dateTime"] = "dateTime";
    CN_OPEN_ORDER["order_type"] = "order_type";
    CN_OPEN_ORDER["pair"] = "pair";
    CN_OPEN_ORDER["size"] = "size";
    CN_OPEN_ORDER["leverage"] = "leverage";
    CN_OPEN_ORDER["margin"] = "margin";
    CN_OPEN_ORDER["side"] = "side";
    CN_OPEN_ORDER["entry_price"] = "entry_price";
    CN_OPEN_ORDER["limit_price"] = "limit_price";
})(CN_OPEN_ORDER = exports.CN_OPEN_ORDER || (exports.CN_OPEN_ORDER = {}));
var CN_USER_INCLUDE_REL;
(function (CN_USER_INCLUDE_REL) {
    CN_USER_INCLUDE_REL["funds"] = "funds";
})(CN_USER_INCLUDE_REL = exports.CN_USER_INCLUDE_REL || (exports.CN_USER_INCLUDE_REL = {}));
var CN_OPEN_ORDER_INCLUDE_REL;
(function (CN_OPEN_ORDER_INCLUDE_REL) {
    CN_OPEN_ORDER_INCLUDE_REL["user"] = "user";
    CN_OPEN_ORDER_INCLUDE_REL["price_copy"] = "price_copy";
    CN_OPEN_ORDER_INCLUDE_REL["openPosition"] = "openPosition";
})(CN_OPEN_ORDER_INCLUDE_REL = exports.CN_OPEN_ORDER_INCLUDE_REL || (exports.CN_OPEN_ORDER_INCLUDE_REL = {}));
var CN_POSITION_HISTORY_INCLUDE_REL;
(function (CN_POSITION_HISTORY_INCLUDE_REL) {
    CN_POSITION_HISTORY_INCLUDE_REL["user"] = "user";
    CN_POSITION_HISTORY_INCLUDE_REL["price_copy"] = "price_copy";
    CN_POSITION_HISTORY_INCLUDE_REL["openPosition"] = "openPosition";
})(CN_POSITION_HISTORY_INCLUDE_REL = exports.CN_POSITION_HISTORY_INCLUDE_REL || (exports.CN_POSITION_HISTORY_INCLUDE_REL = {}));
var CN_OPEN_POSITION;
(function (CN_OPEN_POSITION) {
    CN_OPEN_POSITION["id"] = "id";
    CN_OPEN_POSITION["createdAt"] = "createdAt";
    CN_OPEN_POSITION["status"] = "status";
    CN_OPEN_POSITION["updatedAt"] = "updatedAt";
    CN_OPEN_POSITION["dateTime"] = "dateTime";
    CN_OPEN_POSITION["user"] = "user";
    CN_OPEN_POSITION["order"] = "order";
    CN_OPEN_POSITION["pair"] = "pair";
    CN_OPEN_POSITION["size"] = "size";
    CN_OPEN_POSITION["side"] = "side";
    CN_OPEN_POSITION["entry_price"] = "entry_price";
    CN_OPEN_POSITION["liquidation_price"] = "liquidation_price";
    CN_OPEN_POSITION["stop_price"] = "stop_price";
    CN_OPEN_POSITION["leverage"] = "leverage";
    CN_OPEN_POSITION["profit"] = "profit";
    CN_OPEN_POSITION["price_copy"] = "price_copy";
})(CN_OPEN_POSITION = exports.CN_OPEN_POSITION || (exports.CN_OPEN_POSITION = {}));
var CN_POSITION_HISTORY;
(function (CN_POSITION_HISTORY) {
    CN_POSITION_HISTORY["id"] = "id";
    CN_POSITION_HISTORY["createdAt"] = "createdAt";
    CN_POSITION_HISTORY["status"] = "status";
    CN_POSITION_HISTORY["updatedAt"] = "updatedAt";
    CN_POSITION_HISTORY["dateTime"] = "dateTime";
    CN_POSITION_HISTORY["user"] = "user";
    CN_POSITION_HISTORY["order"] = "order";
    CN_POSITION_HISTORY["pair"] = "pair";
    CN_POSITION_HISTORY["size"] = "size";
    CN_POSITION_HISTORY["side"] = "side";
    CN_POSITION_HISTORY["entry_price"] = "entry_price";
    CN_POSITION_HISTORY["liquidation_price"] = "liquidation_price";
    CN_POSITION_HISTORY["stop_price"] = "stop_price";
    CN_POSITION_HISTORY["leverage"] = "leverage";
    CN_POSITION_HISTORY["profit"] = "profit";
    CN_POSITION_HISTORY["price_copy"] = "price_copy";
})(CN_POSITION_HISTORY = exports.CN_POSITION_HISTORY || (exports.CN_POSITION_HISTORY = {}));
var CN_OPEN_POSITION_INCLUDE_REL;
(function (CN_OPEN_POSITION_INCLUDE_REL) {
    CN_OPEN_POSITION_INCLUDE_REL["order"] = "order";
    CN_OPEN_POSITION_INCLUDE_REL["user"] = "user";
    CN_OPEN_POSITION_INCLUDE_REL["price_copy"] = "price_copy";
})(CN_OPEN_POSITION_INCLUDE_REL = exports.CN_OPEN_POSITION_INCLUDE_REL || (exports.CN_OPEN_POSITION_INCLUDE_REL = {}));
var CN_DEPOSIT;
(function (CN_DEPOSIT) {
    CN_DEPOSIT["id"] = "id";
    CN_DEPOSIT["createdAt"] = "createdAt";
    CN_DEPOSIT["updatedAt"] = "updatedAt";
    CN_DEPOSIT["btc_ammount"] = "btc_ammount";
})(CN_DEPOSIT = exports.CN_DEPOSIT || (exports.CN_DEPOSIT = {}));
var CN_DEPOSIT_REL;
(function (CN_DEPOSIT_REL) {
    CN_DEPOSIT_REL["user"] = "user";
})(CN_DEPOSIT_REL = exports.CN_DEPOSIT_REL || (exports.CN_DEPOSIT_REL = {}));
//# sourceMappingURL=columnNames.js.map