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
var routes_1 = require("../_client/enums/routes");
var codes_1 = require("../_client/enums/codes");
var Auth_1 = require("../manager/Auth");
var RequestValidator_1 = require("../manager/RequestValidator");
var User_1 = require("../controller/User");
var Price_1 = require("../controller/Price");
var OpenOrder_1 = require("../entity/OpenOrder");
var OpenOrder_2 = require("../controller/OpenOrder");
var typeorm_1 = require("typeorm");
var columnNames_1 = require("../_client/enums/columnNames");
var utils_1 = require("../_client/utils");
var OpenOrderRouteHandler = /** @class */ (function () {
    function OpenOrderRouteHandler() {
    }
    Object.defineProperty(OpenOrderRouteHandler, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description Handles the request to create new orders, and place them into OpenOrders
     * @param socketInstance Instance of the socket calling the method.
     * @param request Request package to perform the operation.
     */
    OpenOrderRouteHandler.prototype.handleOpenOrderCreation = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, ROUTE, _payload, _resultCode, invalidCode, userToken, e_1, user, queryDate, bitPrice, ammountToSubstract, currentFunds, margin, remainingFunds, openOrder, openPosition, result, e_2, e_3, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.OPEN_ORDER_ROUTES.CREATE;
                        _payload = { record: null };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 27, , 28]);
                        invalidCode = null;
                        userToken = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, Auth_1.default.parseToken(request._meta._authToken)];
                    case 3:
                        //console.log(`handleOpenOrderCreation -- 3`);
                        userToken = _a.sent();
                        if (!!userToken) return [3 /*break*/, 4];
                        //console.log(`handleOpenOrderCreation -- 4`);
                        invalidCode = codes_1.RESULT_CODE.INVALID_TOKEN;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, RequestValidator_1.default.validateCall(ROUTE, request)];
                    case 5:
                        //console.log(`handleOpenOrderCreation -- 5`);
                        invalidCode = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        //console.log(`handleOpenOrderCreation -- 6`);
                        console.log(e_1);
                        invalidCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(invalidCode === codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 25];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 23, , 24]);
                        return [4 /*yield*/, User_1.default.one({
                                where: {
                                    id: userToken.user.id
                                },
                                relations: ['funds']
                            })];
                    case 10:
                        user = _a.sent();
                        queryDate = void 0;
                        if (request._payload.datetime) {
                            //console.log(`handleOpenOrderCreation -- 10`);
                            if (new Date(request._payload.datetime).toString().indexOf("Invalid") < 0) {
                                //If provided valid date value
                                queryDate = new Date(request._payload.datetime);
                            }
                            else {
                                //If not valid date value, we query the latest current price on the current timestamp
                                queryDate = new Date();
                            }
                        }
                        else {
                            //console.log(`handleOpenOrderCreation -- 11`);
                            queryDate = new Date();
                        }
                        return [4 /*yield*/, Price_1.default.getLastestPrice(queryDate)];
                    case 11:
                        bitPrice = _a.sent();
                        if (!(bitPrice && user)) return [3 /*break*/, 21];
                        ammountToSubstract = utils_1.default._getSubstractAmmount(request._payload.size, bitPrice.price, request._payload.leverage);
                        currentFunds = user.funds.btc_ammount;
                        margin = currentFunds - ammountToSubstract;
                        remainingFunds = utils_1.default.normalizeBitcoinAmmount(currentFunds - ammountToSubstract);
                        if (!(margin > 0)) return [3 /*break*/, 19];
                        //console.log(`handleOpenOrderCreation -- 14`);
                        user.funds.btc_ammount = remainingFunds;
                        openOrder = new OpenOrder_1.OpenOrder();
                        openOrder.leverage = request._payload.leverage;
                        openOrder.order_type = request._payload.order_type;
                        openOrder.pair = request._payload.pair;
                        openOrder.side = request._payload.side;
                        openOrder.stop_price = request._payload.stop_price;
                        openOrder.limit_price = request._payload.limit_price; //TODO: Check on how to get it
                        openOrder.dateTime = new Date();
                        openOrder.entry_price = bitPrice.price;
                        openOrder.limit_price = request._payload.limit_price;
                        openOrder.exit_price = request._payload.exit_price;
                        openOrder.margin = utils_1.default.normalizeBitcoinMargin(remainingFunds);
                        openOrder.size = request._payload.size; //TODO: Make sure it's the same
                        return [4 /*yield*/, OpenOrder_2.default.create(user, openOrder, bitPrice)];
                    case 12:
                        openOrder = _a.sent();
                        openPosition = void 0;
                        if (!request._payload.maker_only) return [3 /*break*/, 18];
                        if (!openOrder) return [3 /*break*/, 17];
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, OpenOrder_2.default.upgradeToOpenPosition(openOrder)];
                    case 14:
                        result = _a.sent();
                        openPosition = result.openPosition;
                        return [3 /*break*/, 16];
                    case 15:
                        e_2 = _a.sent();
                        //Open position not created...
                        console.log("Open position could not be created...");
                        console.log(e_2);
                        return [3 /*break*/, 16];
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        _resultCode = codes_1.RESULT_CODE.OPEN_ORDER_NOT_CREATED;
                        _a.label = 18;
                    case 18:
                        if (openOrder) {
                            _payload.record = openOrder.toJson();
                            if (request._payload.maker_only && !openPosition) {
                                _resultCode = codes_1.RESULT_CODE.OPEN_POSITION_NOT_CREATED;
                            }
                            else {
                                if (request._payload.maker_only && openPosition) {
                                    _payload.openPositon = openPosition.toJson();
                                }
                                else {
                                    socketInstance.server.emit(routes_1.OPEN_ORDER_ROUTES.LISTEN_NEW.replace(codes_1.UID_REPLACEMENT, userToken.user.id + ""), openOrder.toJson());
                                }
                                _resultCode = codes_1.RESULT_CODE.SUCCESS;
                            }
                        }
                        else {
                            _resultCode = codes_1.RESULT_CODE.OPEN_ORDER_NOT_CREATED;
                        }
                        return [3 /*break*/, 20];
                    case 19:
                        //console.log(`handleOpenOrderCreation -- 13 - 2`);
                        _resultCode = codes_1.RESULT_CODE.INSUFFICIENT_FUNDS;
                        _a.label = 20;
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        _resultCode = codes_1.RESULT_CODE.BITCOIN_PRICE_NOT_FOUND;
                        _a.label = 22;
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        e_3 = _a.sent();
                        console.log(e_3);
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 24];
                    case 24: return [3 /*break*/, 26];
                    case 25:
                        _resultCode = invalidCode;
                        _a.label = 26;
                    case 26: return [3 /*break*/, 28];
                    case 27:
                        e_4 = _a.sent();
                        console.log(e_4);
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 28];
                    case 28:
                        payload = utils_1.default
                            .assembleResponsePayload(utils_1.default.assembleResponseMeta(request._meta, _resultCode), _payload);
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Handles the request to update open orders
     * @param socketInstance Instance of the socket calling the method.
     * @param request Request package to perform the operation.
     */
    OpenOrderRouteHandler.prototype.handleOpenOrderUpdate = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, ROUTE, _payload, _resultCode, invalidCode, userToken, e_5, user, openOrder, oldRecord, edited, e_6, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.OPEN_ORDER_ROUTES.UPDATE;
                        _payload = { oldRecord: null, newRecord: null };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 21, , 22]);
                        invalidCode = null;
                        userToken = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, Auth_1.default.parseToken(request._meta._authToken)];
                    case 3:
                        userToken = _a.sent();
                        if (!!userToken) return [3 /*break*/, 4];
                        invalidCode = codes_1.RESULT_CODE.INVALID_TOKEN;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, RequestValidator_1.default.validateCall(ROUTE, request)];
                    case 5:
                        invalidCode = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_5 = _a.sent();
                        invalidCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(invalidCode === codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 19];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 17, , 18]);
                        return [4 /*yield*/, User_1.default.one({
                                where: {
                                    id: userToken.user.id
                                },
                                relations: ['funds']
                            })];
                    case 10:
                        user = _a.sent();
                        openOrder = void 0;
                        if (!user) return [3 /*break*/, 12];
                        return [4 /*yield*/, OpenOrder_2.default.one({
                                where: {
                                    id: request._payload.orderId,
                                    user: user
                                }
                            })];
                    case 11:
                        openOrder = _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!(openOrder && user)) return [3 /*break*/, 15];
                        oldRecord = openOrder.toJson();
                        edited = false;
                        if (request._payload.field.exit_price) {
                            openOrder.exit_price = request._payload.field.exit_price;
                            edited = true;
                        }
                        if (request._payload.field.stop_price) {
                            openOrder.stop_price = request._payload.field.stop_price;
                            edited = true;
                        }
                        if (!edited) return [3 /*break*/, 14];
                        return [4 /*yield*/, OpenOrder_2.default.save(openOrder)];
                    case 13:
                        openOrder = _a.sent();
                        _a.label = 14;
                    case 14:
                        _resultCode = codes_1.RESULT_CODE.SUCCESS;
                        _payload.newRecord = openOrder.toJson();
                        _payload.oldRecord = oldRecord;
                        return [3 /*break*/, 16];
                    case 15:
                        if (!openOrder) {
                            _resultCode = codes_1.RESULT_CODE.OPEN_ORDER_NOT_FOUND;
                        }
                        else {
                            _resultCode = codes_1.RESULT_CODE.USER_NOT_FOUND;
                        }
                        _a.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        e_6 = _a.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 18];
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        _resultCode = invalidCode;
                        _a.label = 20;
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        e_7 = _a.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 22];
                    case 22:
                        payload = utils_1.default
                            .assembleResponsePayload(utils_1.default.assembleResponseMeta(request._meta, _resultCode), _payload);
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Handles the request to search orders
     * @param socketInstance Instance of the socket calling the method.
     * @param request Request package to perform the operation.
     */
    OpenOrderRouteHandler.prototype.handleOpenOrdersFetch = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, ROUTE, _payload, _resultCode, invalidCode, userToken, e_8, user, options_1, notAllowedFields_1, openOrders, e_9, e_10, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ROUTE = routes_1.OPEN_ORDER_ROUTES.FETCH;
                        _payload = { records: null };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 16, , 17]);
                        invalidCode = null;
                        userToken = null;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, Auth_1.default.parseToken(request._meta._authToken)];
                    case 3:
                        userToken = _b.sent();
                        if (!!userToken) return [3 /*break*/, 4];
                        invalidCode = codes_1.RESULT_CODE.INVALID_TOKEN;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, RequestValidator_1.default.validateCall(ROUTE, request)];
                    case 5:
                        invalidCode = _b.sent();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_8 = _b.sent();
                        invalidCode = codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(invalidCode === codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 14];
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 12, , 13]);
                        return [4 /*yield*/, User_1.default.one({
                                where: {
                                    id: userToken.user.id
                                },
                                select: ['id']
                            })];
                    case 10:
                        user = _b.sent();
                        options_1 = {
                            where: {
                                user: user
                            },
                            skip: request._payload.skip ? request._payload.skip : 0,
                            take: request._payload.limit ? request._payload.limit : 0
                        };
                        notAllowedFields_1 = ['user'];
                        if (request._payload.exact && Object.keys(request._payload.exact).length > 0) {
                            Object.keys(request._payload.exact)
                                .filter(function (key) {
                                return notAllowedFields_1.indexOf(key) < 0;
                            })
                                .forEach(function (key) {
                                options_1.where[key] = request._payload.exact[key];
                            });
                            notAllowedFields_1.concat(Object.keys(request._payload.exact));
                        }
                        if (request._payload.like && Object.keys(request._payload.like).length > 0) {
                            Object.keys(request._payload.like)
                                .filter(function (key) {
                                return notAllowedFields_1.indexOf(key) < 0;
                            })
                                .forEach(function (key) {
                                options_1.where[key] = typeorm_1.Like("%" + request._payload.like[key] + "%");
                            });
                            notAllowedFields_1.concat(Object.keys(request._payload.like));
                        }
                        if (request._payload.greaterThan) {
                            Object.keys(request._payload.greaterThan)
                                .filter(function (key) {
                                return notAllowedFields_1.indexOf(key) < 0;
                            })
                                .forEach(function (key) {
                                options_1.where[key] = typeorm_1.MoreThan(request._payload.greaterThan[key]);
                            });
                        }
                        if (request._payload.lesserThan) {
                            Object.keys(request._payload.lesserThan)
                                .filter(function (key) {
                                return notAllowedFields_1.indexOf(key) < 0;
                            })
                                .forEach(function (key) {
                                options_1.where[key] = typeorm_1.LessThan(request._payload.lesserThan[key]);
                            });
                        }
                        if (request._payload.orderBy && request._payload.order) {
                            options_1.order = (_a = {}, _a[request._payload.orderBy] = request._payload.order, _a);
                        }
                        if (request._payload.includedRel && (request._payload.includedRel.length > 0)) {
                            options_1.relations = request._payload.includedRel;
                        }
                        return [4 /*yield*/, OpenOrder_2.default.all(options_1)];
                    case 11:
                        openOrders = _b.sent();
                        _resultCode = codes_1.RESULT_CODE.SUCCESS;
                        _payload.records = openOrders.map(function (element) {
                            return element.toJson();
                        });
                        return [3 /*break*/, 13];
                    case 12:
                        e_9 = _b.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        _resultCode = invalidCode;
                        _b.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        e_10 = _b.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 17];
                    case 17:
                        payload = utils_1.default
                            .assembleResponsePayload(utils_1.default.assembleResponseMeta(request._meta, _resultCode), _payload);
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Handles the request to perform the Open Order cancellation
     * @param socketInstance Instance of the socket calling the method.
     * @param request Request package to perform the operation.
     */
    OpenOrderRouteHandler.prototype.handleOpenOrderCancel = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var ROUTE, payload, _payload, _resultCode, invalidCode, userToken, e_11, user, openOrder, restoreBitcoinAmmount, e_12, e_13, e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.OPEN_ORDER_ROUTES.CANCEL;
                        _payload = { cancelledOrder: null };
                        console.log("handleOpenOrderCancel-- 1");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 22, , 23]);
                        invalidCode = null;
                        userToken = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, Auth_1.default.parseToken(request._meta._authToken)];
                    case 3:
                        userToken = _a.sent();
                        if (!!userToken) return [3 /*break*/, 4];
                        invalidCode = codes_1.RESULT_CODE.INVALID_TOKEN;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, RequestValidator_1.default.validateCall(ROUTE, request)];
                    case 5:
                        invalidCode = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_11 = _a.sent();
                        invalidCode = codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(invalidCode === codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 20];
                        console.log("handleOpenOrderCancel-- 2");
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 18, , 19]);
                        console.log("handleOpenOrderCancel-- 3");
                        return [4 /*yield*/, User_1.default.one({
                                where: {
                                    id: userToken.user.id
                                },
                                select: ['id'],
                                relations: [columnNames_1.CN_USER_INCLUDE_REL.funds]
                            })];
                    case 10:
                        user = _a.sent();
                        return [4 /*yield*/, OpenOrder_2.default.one({
                                where: {
                                    id: request._payload.orderId,
                                    user: user
                                },
                                relations: ['price_copy']
                            })];
                    case 11:
                        openOrder = _a.sent();
                        console.log("handleOpenOrderCancel-- 4");
                        if (!(user && openOrder)) return [3 /*break*/, 16];
                        _a.label = 12;
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        restoreBitcoinAmmount = utils_1.default._getSubstractAmmount(openOrder.size, openOrder.price_copy.price, openOrder.leverage);
                        user.funds.btc_ammount = utils_1.default.normalizeBitcoinAmmount(user.funds.btc_ammount + restoreBitcoinAmmount);
                        return [4 /*yield*/, OpenOrder_2.default.cancel(user, openOrder)];
                    case 13:
                        user = _a.sent();
                        console.log("handleOpenOrderCancel-- 5");
                        if (user) {
                            console.log("handleOpenOrderCancel-- 5-1");
                            _resultCode = codes_1.RESULT_CODE.SUCCESS;
                            _payload = { funds: user.funds.toJson(), cancelledOrder: openOrder.toJson() };
                        }
                        else {
                            console.log("handleOpenOrderCancel-- 5-2");
                            _resultCode = codes_1.RESULT_CODE.ERROR_CANCELING_ORDER;
                        }
                        return [3 /*break*/, 15];
                    case 14:
                        e_12 = _a.sent();
                        console.log("handleOpenOrderCancel-- 6");
                        _resultCode = codes_1.RESULT_CODE.ERROR_CANCELING_ORDER;
                        return [3 /*break*/, 15];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        console.log("handleOpenOrderCancel-- 7");
                        if (!openOrder) {
                            console.log("handleOpenOrderCancel-- 8");
                            _resultCode = codes_1.RESULT_CODE.OPEN_ORDER_NOT_FOUND;
                        }
                        else if (!user) {
                            console.log("handleOpenOrderCancel-- 9");
                            _resultCode = codes_1.RESULT_CODE.USER_NOT_FOUND;
                        }
                        _a.label = 17;
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        e_13 = _a.sent();
                        console.log("handleOpenOrderCancel-- 10");
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 19];
                    case 19: return [3 /*break*/, 21];
                    case 20:
                        console.log("handleOpenOrderCancel-- 11");
                        _resultCode = invalidCode || codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        _a.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        e_14 = _a.sent();
                        console.log("handleOpenOrderCancel-- 12");
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 23];
                    case 23:
                        payload = utils_1.default
                            .assembleResponsePayload(utils_1.default.assembleResponseMeta(request._meta, _resultCode), _payload);
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenOrderRouteHandler._instance = new OpenOrderRouteHandler();
    return OpenOrderRouteHandler;
}());
exports.OpenOrderRouteHandler = OpenOrderRouteHandler;
exports.default = OpenOrderRouteHandler.Instance;
//# sourceMappingURL=OpenOrder.js.map