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
var OpenPosition_1 = require("../entity/OpenPosition");
var User_1 = require("../entity/User");
var Price_1 = require("../entity/Price");
var PositionHistory_1 = require("../entity/PositionHistory");
var order_1 = require("../_client/enums/order");
var columnNames_1 = require("../enum/columnNames");
var tableName_1 = require("../enum/tableName");
var ConnectionManager_1 = require("../manager/ConnectionManager");
var routes_1 = require("../_client/enums/routes");
var Funds_1 = require("../entity/Funds");
var codes_1 = require("../_client/enums/codes");
var utils_1 = require("../_client/utils");
var OpenPositionController = /** @class */ (function () {
    function OpenPositionController() {
    }
    Object.defineProperty(OpenPositionController, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpenPositionController.prototype, "openPositionRepository", {
        get: function () {
            this._openPositionRepository = (this._openPositionRepository) ? this._openPositionRepository : DatabaseManager_1.default.databaseConnection.getRepository(OpenPosition_1.OpenPosition);
            return this._openPositionRepository;
        },
        enumerable: true,
        configurable: true
    });
    OpenPositionController.prototype.all = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openPositionRepository.find(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OpenPositionController.prototype.one = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openPositionRepository.findOne(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OpenPositionController.prototype.save = function (_openPosition) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openPositionRepository.save(_openPosition)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, _openPosition];
                }
            });
        });
    };
    /**
     * @description Creates a new OpenPosition.
     * @param user User that is creating this open position
     * @param openPosition Open position with the required data; record not yet created.
     * @param price The current bitcoin price record
     */
    OpenPositionController.prototype.create = function (user, openPosition, price) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (accept) { return __awaiter(_this, void 0, void 0, function () {
                                var newPrice;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            newPrice = new Price_1.Price();
                                            price.id = price.getNewId();
                                            price._tradeCopy = true;
                                            openPosition.id = openPosition.getNewId();
                                            openPosition.price_copy = newPrice;
                                            openPosition.user = user;
                                            return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(OpenPosition_1.OpenPosition).save(openPosition)];
                                        case 1:
                                            openPosition = _a.sent();
                                            accept(openPosition);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        openPosition = _a.sent();
                        //ConnectionManager.emitBroadcast(OPEN_POSITION_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, user.id.toString()), openPosition.toJson());
                        return [2 /*return*/, openPosition];
                    case 2:
                        e_1 = _a.sent();
                        console.log("Error caught: ", e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description This transforms the ammount of fia proffit (BTCUSD) to bitcoin
     * @param bitcointPrice Current bitcoin price (USDBTC)
     * @param ammountFiat Profit to be earned
     */
    OpenPositionController.prototype.fiatToBTC = function (bitcointPrice, ammountFiat) {
        return utils_1.default.normalizeBitcoinAmmount(ammountFiat / bitcointPrice);
    };
    /**
     * @description Closes the sell of the bitcoin price, and creates a new PositionHistory record.
     * @param user The user record that is performing the closing
     * @param openPosition The open position to close. Should have loaded relationship price_copy.
     * @param price The current market price record at the moment of the upgrade
     */
    OpenPositionController.prototype.closeToCMP = function (user, openPosition, price) {
        return __awaiter(this, void 0, void 0, function () {
            var newPositionHistory, _a, _b, tradeProfit, _c, oldOpenPosition, e_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        newPositionHistory = new PositionHistory_1.PositionHistory();
                        newPositionHistory.id = newPositionHistory.getNewId();
                        newPositionHistory.status = order_1.OPEN_POSITION_STATUS.ACTIVE;
                        newPositionHistory.pair = openPosition.pair;
                        newPositionHistory.size = openPosition.size;
                        newPositionHistory.side = openPosition.side;
                        newPositionHistory.stop_price = openPosition.stop_price;
                        newPositionHistory.exit_price = openPosition.exit_price;
                        newPositionHistory.entry_price = openPosition.entry_price;
                        newPositionHistory.leverage = openPosition.leverage;
                        newPositionHistory.margin = openPosition.margin;
                        newPositionHistory.dateTime = new Date();
                        if (!!openPosition.price_copy) return [3 /*break*/, 2];
                        _a = openPosition;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(Price_1.Price).findOne({
                                where: {
                                    openPosition: openPosition.id
                                },
                                select: ['price']
                            })];
                    case 1:
                        _a.price_copy = _d.sent();
                        _d.label = 2;
                    case 2:
                        if (!!user.funds) return [3 /*break*/, 4];
                        _b = user;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(Funds_1.Funds).findOne({
                                where: {
                                    user: user
                                }, select: ['btc_ammount']
                            })];
                    case 3:
                        _b.funds = _d.sent();
                        _d.label = 4;
                    case 4:
                        tradeProfit = utils_1.default.getProfit(price.price, openPosition.entry_price, openPosition.size, price.price, openPosition.leverage, openPosition.side);
                        console.log("tradeProfit: ", tradeProfit);
                        newPositionHistory.profit = tradeProfit;
                        user.funds.btc_ammount = utils_1.default.normalizeBitcoinAmmount(user.funds.btc_ammount + newPositionHistory.profit);
                        newPositionHistory.user = new User_1.User();
                        newPositionHistory.user.id = user.id;
                        newPositionHistory.liquidation_price = openPosition.liquidation_price;
                        newPositionHistory.price_copy = openPosition.price_copy;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(PositionHistory_1.PositionHistory).save(newPositionHistory)];
                    case 5:
                        newPositionHistory = _d.sent();
                        _c = user;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(Funds_1.Funds).save(user.funds)];
                    case 6:
                        _c.funds = _d.sent();
                        ConnectionManager_1.default.emitBroadcast(routes_1.FUND_ROUTES.LISTEN_UPDATED.replace(codes_1.UID_REPLACEMENT, user.id.toString()), user.funds.toJson());
                        oldOpenPosition = openPosition.toJson();
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(OpenPosition_1.OpenPosition).delete(openPosition.id)];
                    case 7:
                        _d.sent();
                        //console.log(`Sending broadcast to: ${OPEN_POSITION_ROUTES.LISTEN_CLOSED_AMP.replace(UID_REPLACEMENT, user.id.toString())}`);
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_POSITION_ROUTES.LISTEN_CLOSED_AMP.replace(codes_1.UID_REPLACEMENT, user.id.toString()), oldOpenPosition);
                        //console.log(`Sending broadcast to: ${OPEN_POSITION_ROUTES.LISTEN_REMOVED.replace(UID_REPLACEMENT, user.id.toString())}`);
                        ConnectionManager_1.default.emitBroadcast(routes_1.OPEN_POSITION_ROUTES.LISTEN_REMOVED.replace(codes_1.UID_REPLACEMENT, user.id.toString()), oldOpenPosition);
                        //console.log(`Sending broadcast to: ${POSITION_HISTORY_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, user.id.toString())}`);
                        ConnectionManager_1.default.emitBroadcast(routes_1.POSITION_HISTORY_ROUTES.LISTEN_NEW.replace(codes_1.UID_REPLACEMENT, user.id.toString()), newPositionHistory.toJson());
                        return [2 /*return*/, { history: newPositionHistory, position: oldOpenPosition, user: user }];
                    case 8:
                        e_2 = _d.sent();
                        console.log(e_2);
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Updates the orders on the system that meets certain criteria
     * specified by the bitcoin price and the orders data, by closing them.
     * @param price The price that has just been updated (the current bitcoin price).
     */
    OpenPositionController.prototype.closeMetOpenPositions = function (price) {
        return __awaiter(this, void 0, void 0, function () {
            var OOALIAS, builder, selectedColumns, query, queryResult, mapped, i, openPosition, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        OOALIAS = "matching_open_position";
                        builder = this.openPositionRepository.manager.createQueryBuilder();
                        selectedColumns = Object.keys(columnNames_1.COLUMN_NAME.OPEN_POSITION).map(function (key) {
                            return OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_POSITION[key] + " as " + OOALIAS + columnNames_1.COLUMN_NAME.OPEN_POSITION[key];
                        }).join(", ");
                        query = builder
                            .select(selectedColumns)
                            .from(OpenPosition_1.OpenPosition, OOALIAS)
                            .innerJoinAndSelect("" + tableName_1.TABLE_NAME.USER, "_user", "_user." + columnNames_1.COLUMN_NAME.USER.id + " = " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_POSITION.user)
                            .innerJoinAndSelect("" + tableName_1.TABLE_NAME.PRICE, "_price", "_price." + columnNames_1.COLUMN_NAME.PRICE.id + " = " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_POSITION.price_copy)
                            .where(OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_POSITION.status + " = :_status", { _status: order_1.OPEN_POSITION_STATUS.ACTIVE })
                            .andWhere("( "
                            + ("( " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_POSITION.exit_price + " < :_price AND " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_POSITION.side + " = :_side_short)")
                            + " OR "
                            + ("( " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_POSITION.exit_price + " > :_price AND " + OOALIAS + "." + columnNames_1.COLUMN_NAME.OPEN_POSITION.side + " = :_side_long)")
                            + " )", {
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
                            var openOrder = new OpenPosition_1.OpenPosition();
                            var dissallowedFields = (_a = {},
                                _a[priceAlias] = [priceAlias + "_tradeCopy"],
                                _a[userAlias] = [userAlias + "auth"],
                                _a[openOrderAlias] = [openOrderAlias + "user_id", openOrderAlias + "price_copy"],
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
                        console.log("Ammount of mapped open positions to update to open history: ", mapped.length);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < mapped.length)) return [3 /*break*/, 7];
                        openPosition = mapped[i];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.closeToCMP(openPosition.user, openPosition, price)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        console.log("\n\n\t\t\t\t\t#12# ERROR CLOSING AT MARKET PRICE: \n\n\t\t\t\t\t\n\t\t\t\t\t", e_3);
                        return [3 /*break*/, 6];
                    case 6:
                        i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OpenPositionController.prototype.remove = function (_openPosition) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openPositionRepository.remove(_openPosition)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenPositionController._instance = new OpenPositionController();
    return OpenPositionController;
}());
exports.OpenPositionController = OpenPositionController;
exports.default = OpenPositionController.Instance;
//# sourceMappingURL=OpenPosition.js.map