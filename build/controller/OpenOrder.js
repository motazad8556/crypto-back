"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseManager_1 = require("../manager/DatabaseManager");
var User_1 = require("../entity/User");
var Price_1 = require("../entity/Price");
var OpenOrder_1 = require("../entity/OpenOrder");
var order_1 = require("../_client/enums/order");
var tableName_1 = require("../enum/tableName");
var columnNames_1 = require("../enum/columnNames");
var OpenPosition_1 = require("../entity/OpenPosition");
var Funds_1 = require("../entity/Funds");
var routes_1 = require("../_client/enums/routes");
var ConnectionManager_1 = require("../manager/ConnectionManager");
var codes_1 = require("../_client/enums/codes");
var utils_1 = require("../_client/utils");
var OpenOrderController = /** @class */ (function () {
    function OpenOrderController() {
    }
    Object.defineProperty(OpenOrderController, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpenOrderController.prototype, "openOrderRepository", {
        get: function () {
            this._openOrderRepository = (this._openOrderRepository) ? this._openOrderRepository : DatabaseManager_1.default.databaseConnection.getRepository(OpenOrder_1.OpenOrder);
            return this._openOrderRepository;
        },
        enumerable: true,
        configurable: true
    });
    OpenOrderController.prototype.all = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openOrderRepository.find(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OpenOrderController.prototype.one = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openOrderRepository.findOne(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OpenOrderController.prototype.save = function (_openOrder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openOrderRepository.save(_openOrder)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, _openOrder];
                }
            });
        });
    };
    /**
     * @description Creates a new order and updates the required records
     * @param user User who's creating the order
     * @param openOrder Open order record to be created
     * @param price Price to be bound to the order
     */
    OpenOrderController.prototype.create = function (user, openOrder, price) {
        return __awaiter(this, void 0, void 0, function () {
            var newPrice, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        newPrice = new Price_1.Price();
                        newPrice.id = price.getNewId();
                        newPrice.price = price.price;
                        newPrice.timestamp = price.timestamp;
                        newPrice._tradeCopy = true;
                        newPrice.symbol = price.symbol;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(Price_1.Price).create(newPrice)];
                    case 1:
                        newPrice = _a.sent();
                        openOrder.id = openOrder.getNewId();
                        openOrder.user = user;
                        openOrder.dateTime = new Date();
                        openOrder.price_copy = newPrice;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(OpenOrder_1.OpenOrder).save(openOrder)];
                    case 2:
                        openOrder = _a.sent();
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(User_1.User).save(user)];
                    case 3:
                        user = _a.sent();
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_ORDER_ROUTES.LISTEN_NEW.replace(codes_1.UID_REPLACEMENT, user.id + ""), openOrder.toJson());
                        ConnectionManager_1.default.emitBroadcast(routes_1.FUND_ROUTES.LISTEN_UPDATED.replace(codes_1.UID_REPLACEMENT, user.id + ""), user.funds.toJson());
                        return [2 /*return*/, openOrder];
                    case 4:
                        e_1 = _a.sent();
                        console.log("Error creating open order: ", e_1);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Cancels the specified order and updates the required records
     * @param user User who's creating the order
     * @param openOrder Open order record to be created
     * @param price Price to be bound to the order
     */
    OpenOrderController.prototype.cancel = function (user, openOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var removedJson, price, _a, e_2, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        removedJson = openOrder.toJson();
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(Price_1.Price).findOne({ where: { openOrder: openOrder.id }, select: ['id'] })];
                    case 2:
                        price = _b.sent();
                        price.openOrder = null;
                        openOrder.price_copy = null;
                        DatabaseManager_1.default.databaseConnection.getRepository(Price_1.Price).save(price);
                        return [4 /*yield*/, this.openOrderRepository.save(openOrder)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.openOrderRepository.remove(openOrder)];
                    case 4:
                        _b.sent();
                        _a = user;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(Funds_1.Funds).save(user.funds)];
                    case 5:
                        _a.funds = _b.sent();
                        ConnectionManager_1.default.emitBroadcast(routes_1.FUND_ROUTES.LISTEN_UPDATED.replace(codes_1.UID_REPLACEMENT, user.id + ""), user.funds.toJson());
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_ORDER_ROUTES.LISTEN_CANCELLED.replace(codes_1.UID_REPLACEMENT, user.id + ""), removedJson);
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_ORDER_ROUTES.LISTEN_REMOVED.replace(codes_1.UID_REPLACEMENT, user.id + ""), removedJson);
                        return [2 /*return*/, user];
                    case 6:
                        e_2 = _b.sent();
                        console.log("Error cancelling order #1: \n\n\n", e_2);
                        return [2 /*return*/, null];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_3 = _b.sent();
                        console.log("Error cancelling order #2: ", e_3);
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OpenOrderController.prototype.remove = function (_openOrder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openOrderRepository.remove(_openOrder)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Upgrades an open order to an open position.
     * @param order The order to update. Must have loaded Price and User as it's relationships.
     * @returns
     * 1. OpenOrder: The order that has been upgraded and (if it's set to delete) deleted.
     * 2. OpenPosition: The new open position.
     */
    OpenOrderController.prototype.upgradeToOpenPosition = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteOpenOrderRecord, newOpenPosition, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteOpenOrderRecord = true;
                        newOpenPosition = new OpenPosition_1.OpenPosition();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        newOpenPosition.id = newOpenPosition.getNewId();
                        newOpenPosition.status = order_1.OPEN_POSITION_STATUS.ACTIVE;
                        newOpenPosition.pair = order.pair;
                        newOpenPosition.size = order.size;
                        newOpenPosition.side = order.side;
                        newOpenPosition.stop_price = order.stop_price;
                        newOpenPosition.exit_price = order.exit_price;
                        newOpenPosition.entry_price = order.entry_price;
                        newOpenPosition.leverage = order.leverage;
                        newOpenPosition.dateTime = new Date();
                        newOpenPosition.margin = order.margin;
                        newOpenPosition.user = new User_1.User();
                        newOpenPosition.user.id = order.user.id;
                        newOpenPosition.liquidation_price = utils_1.default.calculateLiquidationPrice(order.entry_price, order.leverage);
                        if (!deleteOpenOrderRecord) {
                            newOpenPosition.order = new OpenOrder_1.OpenOrder();
                            newOpenPosition.order.id = order.id;
                        }
                        newOpenPosition.price_copy = new Price_1.Price();
                        newOpenPosition.price_copy.id = order.price_copy.id;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(OpenPosition_1.OpenPosition).save(newOpenPosition)];
                    case 2:
                        _a.sent();
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_POSITION_ROUTES.LISTEN_NEW.replace(codes_1.UID_REPLACEMENT, order.user.id + ""), order.toJson());
                        if (!deleteOpenOrderRecord) return [3 /*break*/, 4];
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(OpenOrder_1.OpenOrder).delete(order.id)];
                    case 3:
                        _a.sent();
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_ORDER_ROUTES.LISTEN_REMOVED.replace(codes_1.UID_REPLACEMENT, order.user.id + ""), order.toJson());
                        return [3 /*break*/, 6];
                    case 4:
                        order.status = order_1.OPEN_ORDER_STATUS.COMPLETED;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(OpenOrder_1.OpenOrder).save(order)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_POSITION_ROUTES.LISTEN_NEW.replace(codes_1.UID_REPLACEMENT, order.user.id.toString()), newOpenPosition.toJson());
                        return [3 /*break*/, 8];
                    case 7:
                        e_4 = _a.sent();
                        console.log("Error upgradeToOpenPosition #1: ", e_4);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, { openOrder: order, openPosition: newOpenPosition }];
                }
            });
        });
    };
    /**
     * @description Updates the orders on the system that meets certain criteria
     * specified by the bitcoin price and the orders data to new open positions
     * @param price The price that has just been updated (the current bitcoin price).
     */
    OpenOrderController.prototype.upgradeMetOpenOrders = function (price) {
        return __awaiter(this, void 0, void 0, function () {
            var OOALIAS, builder, query, queryResult, mapped, i, order, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        OOALIAS = "matching_open_order";
                        builder = this.openOrderRepository.manager.createQueryBuilder();
                        query = builder
                            .select(Object.keys(columnNames_1.COLUMN_NAME.OPEN_ORDER).map(function (key) {
                            return OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_ORDER[key] + " as " + OOALIAS + columnNames_1.COLUMN_NAME.OPEN_ORDER[key];
                        }).join(", "))
                            .from(OpenOrder_1.OpenOrder, OOALIAS)
                            .innerJoinAndSelect("" + tableName_1.TABLE_NAME.USER, "_user", "_user." + columnNames_1.COLUMN_NAME.USER.id + " = " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_ORDER.user)
                            .innerJoinAndSelect("" + tableName_1.TABLE_NAME.PRICE, "_price", "_price." + columnNames_1.COLUMN_NAME.PRICE.id + " = " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_ORDER.price_copy)
                            .where(OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_ORDER.status + " = :_status", { _status: order_1.OPEN_ORDER_STATUS.ACTIVE })
                            .andWhere(" ( " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_ORDER.limit_price + " > :_price AND " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_ORDER.side + " = :_side_short)"
                            + " OR "
                            + (" ( " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_ORDER.limit_price + " > :_price AND " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_ORDER.side + " = :_side_long)"), {
                            _price: price.price,
                            _side_short: order_1.ORDER_SIDE.SHORT,
                            _side_long: order_1.ORDER_SIDE.LONG
                        });
                        return [4 /*yield*/, query.getRawMany()];
                    case 1:
                        queryResult = _a.sent();
                        if (!(queryResult.length > 0)) return [3 /*break*/, 7];
                        mapped = queryResult.map(function (rawData) {
                            var openOrderAlias = OOALIAS;
                            var priceAlias = "_price_";
                            var priceFName = "price_copy";
                            var userAlias = "_user_";
                            var userFName = "user";
                            var openOrder = new OpenOrder_1.OpenOrder();
                            var dissallowedFields = (_a = {},
                                _a[priceAlias] = [priceAlias + "_tradeCopy"],
                                _a[userAlias] = [userAlias + "auth"],
                                _a[openOrderAlias] = [openOrderAlias + "user_id", openOrderAlias + "price_copy_id"],
                                _a);
                            Object.keys(rawData).forEach(function (key) {
                                if ((key.indexOf(openOrderAlias) == 0) && (dissallowedFields[openOrderAlias].indexOf(key) < 0)) {
                                    openOrder[key.replace(openOrderAlias, '')] = rawData[key];
                                }
                                else if ((key.indexOf(priceAlias) == 0) && (dissallowedFields[priceAlias].indexOf(key) < 0)) {
                                    openOrder[priceFName] = openOrder[priceFName] ? openOrder[priceFName] : new Price_1.Price();
                                    openOrder[priceFName][key.replace(priceAlias, '')] = rawData[key];
                                }
                                else if ((key.indexOf(userAlias) == 0) && (dissallowedFields[userAlias].indexOf(key) < 0)) {
                                    openOrder[userFName] = openOrder[userFName] ? openOrder[userFName] : new User_1.User();
                                    openOrder[userFName][key.replace(userAlias, '')] = rawData[key];
                                }
                            });
                            return openOrder;
                            var _a;
                        });
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < mapped.length)) return [3 /*break*/, 7];
                        order = mapped[i];
                        order.entry_price = price.price;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        console.log("Upgrading open order...", order);
                        return [4 /*yield*/, this.upgradeToOpenPosition(order)];
                    case 4:
                        _a.sent();
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_ORDER_ROUTES.LISTEN_UPGRADED_TO_OP.replace(codes_1.UID_REPLACEMENT, order.user.id.toString()), order.toJson());
                        return [3 /*break*/, 6];
                    case 5:
                        e_5 = _a.sent();
                        console.log("Error updating open order...");
                        return [3 /*break*/, 6];
                    case 6:
                        i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OpenOrderController._instance = new OpenOrderController();
    return OpenOrderController;
}());
exports.OpenOrderController = OpenOrderController;
exports.default = OpenOrderController.Instance;
//# sourceMappingURL=OpenOrder.js.map