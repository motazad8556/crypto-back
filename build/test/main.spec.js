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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var _config_1 = require("../_config");
var ConnectionManager_1 = require("../manager/ConnectionManager");
var auth_1 = require("../_client/controller/auth");
var codes_1 = require("../_client/enums/codes");
var user_1 = require("../_client/controller/user");
var _init_1 = require("../_client/_init");
var _init_2 = require("../_init");
var price_1 = require("../_client/controller/price");
var routes_1 = require("../_client/enums/routes");
var symbols_1 = require("../_client/enums/symbols");
var RequestValidator_1 = require("../manager/RequestValidator");
var order_1 = require("../_client/controller/order");
var order_2 = require("../_client/enums/order");
var query_1 = require("../_client/enums/query");
var columnNames_1 = require("../_client/enums/columnNames");
var deposit_1 = require("../_client/controller/deposit");
var funds_1 = require("../_client/controller/funds");
var utils_1 = require("../_client/utils");
it.skip('Auxiliary Testing', function () {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.timeout(60000);
                    console.log(Object.values(symbols_1.SYMBOL));
                    console.log("Object.values(SYMBOL).indexOf(SYMBOL.XBT)>-1: " + (Object.values(symbols_1.SYMBOL).indexOf(symbols_1.SYMBOL.XBT) > -1));
                    return [4 /*yield*/, RequestValidator_1.PayloadValidator.Instance.validateRequestPayload(routes_1.PRICE_ROUTES.PRICE_GET_XBT, {
                            symbol: symbols_1.SYMBOL.XBT
                        })];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/];
            }
        });
    });
});
describe('Main Testing', function () {
    var testData = {
        firstName: "firstTestName",
        lastName: "lastTestName",
        username: "username1",
        email: "email1@gmail.com",
        coutry: "USA",
        photo: "SOMETHINGOBERHERE",
        password: "123456"
    };
    var invalidTestData = {
        firstName: "firstTestName",
        lastName: "lastTestName",
        username: "username1",
        email: "email2@gmail.com",
        coutry: "US",
        photo: "SOMETHINGOBERHERE",
        password: "12345678"
    };
    before(function configureTestEnv() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(300000);
                        return [4 /*yield*/, _init_2.default.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, _init_1.default.init()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Should test server configuration', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            chai_1.expect(typeof _config_1.default.ExpressPort === "number").to.be.eq(true);
            return [2 /*return*/];
        });
    }); });
    it('Should test server socket is listening to new calls', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, ConnectionManager_1.default.isAcceptingSocketConnections()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.be.eq(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    describe('Should test the client interaction', function testClientInteractions() {
        it('Tests Client/Server User Creation Functionality', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signUp(testData)];
                        case 1:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(result._payload.createdAt).to.be.greaterThan(0);
                            chai_1.expect(result._payload.id).to.be.greaterThan(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it.skip('Tests Client/Server User Creation Validation -- Requires previous test enabled', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, INVALID_USERNAME_DATA;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signUp(invalidTestData)];
                        case 1:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.USERNAME_ALREADY_REGISTERED);
                            return [4 /*yield*/, auth_1.default.signUp(testData)];
                        case 2:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.EMAIL_ALREADY_REGISTERED);
                            INVALID_USERNAME_DATA = JSON.parse(JSON.stringify(testData));
                            INVALID_USERNAME_DATA.email = "another2@gmail.com";
                            return [4 /*yield*/, auth_1.default.signUp(INVALID_USERNAME_DATA)];
                        case 3:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.USERNAME_ALREADY_REGISTERED);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it.skip('Tests the user Auth. sign-in', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            result = _a.sent();
                            chai_1.expect(typeof result._payload.authToken).to.be.eq("string");
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: invalidTestData.email,
                                    password: invalidTestData.password
                                })];
                        case 2:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.EMAIL_DOES_NOT_EXIST);
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: testData.email,
                                    password: invalidTestData.password
                                })];
                        case 3:
                            result = _a.sent();
                            console.log(result);
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.INVALID_PASSWORD);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it.skip('Tests user update + fetch', function () {
            return __awaiter(this, void 0, void 0, function () {
                var signIn, updateUserName, result, updatedInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            updateUserName = "User_" + new Date().getTime();
                            return [4 /*yield*/, user_1.default.updateAccount({
                                    username: updateUserName
                                }, signIn._payload.authToken)];
                        case 2:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            return [4 /*yield*/, user_1.default.fetchAccount({
                                    fields: ['username']
                                }, signIn._payload.authToken)];
                        case 3:
                            updatedInfo = _a.sent();
                            chai_1.expect(updatedInfo._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(updatedInfo._payload.username).to.be.eq(updateUserName);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it.skip('Test the user password change', function () {
            return __awaiter(this, void 0, void 0, function () {
                var signIn, changePasswordResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            return [4 /*yield*/, auth_1.default.changePassword({
                                    password: testData.password,
                                    newPassword: testData.password + "32"
                                }, signIn._payload.authToken)];
                        case 2:
                            changePasswordResult = _a.sent();
                            chai_1.expect(changePasswordResult._payload.changed).to.be.eq(true);
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: testData.email,
                                    password: testData.password + "32"
                                })];
                        case 3:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(typeof signIn._payload.authToken).to.be.eq("string");
                            return [4 /*yield*/, auth_1.default.changePassword({
                                    password: testData.password + "32",
                                    newPassword: testData.password
                                }, signIn._payload.authToken)];
                        case 4:
                            changePasswordResult = _a.sent();
                            chai_1.expect(changePasswordResult._payload.changed).to.be.eq(true);
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: testData.email,
                                    password: testData.password
                                })];
                        case 5:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('Should test the prices functionality', function () {
        it('Should test the price updates', function testPriceUpdates() {
            return __awaiter(this, void 0, void 0, function () {
                var prices, signIn, currentPrice;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(300000);
                            return [4 /*yield*/, new Promise(function (accept) {
                                    var prices = [];
                                    var handler = function (price) {
                                        console.log("Adding price #" + (prices.length + 1) + ": \n", price, "\n\n");
                                        prices.push(price);
                                    };
                                    var emitter = price_1.default.listenToPrice(symbols_1.SYMBOL.XBT);
                                    emitter.on(symbols_1.SYMBOL.XBT, handler);
                                    setTimeout(function () {
                                        price_1.default.unlistenToPrice(symbols_1.SYMBOL.XBT);
                                        accept(prices);
                                    }, 10000);
                                })];
                        case 1:
                            prices = _a.sent();
                            chai_1.expect(prices.length).to.be.greaterThan(0);
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: testData.email,
                                    password: testData.password
                                })];
                        case 2:
                            signIn = _a.sent();
                            return [4 /*yield*/, price_1.default.getCurrentPrice(symbols_1.SYMBOL.XBT, signIn._payload.authToken)];
                        case 3:
                            currentPrice = _a.sent();
                            chai_1.expect(currentPrice).to.not.be.eq(null);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('Should test the orders functionality', function () {
        //Tried with: long, market order, 100/9800/10000
        it('Should create a order', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, result, newOrders;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(5000);
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: testData.email,
                                    password: testData.password
                                })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: new Date(),
                                    size: 100,
                                    limit_price: 4000,
                                    entry_price: 5000,
                                    exit_price: 6000,
                                    stop_price: 6000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 0
                                }, token)];
                        case 2:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.INVALID_TOKEN);
                            token = signIn._payload.authToken;
                            newOrders = [];
                            order_1.default.listenNewOrderAdded(signIn._payload.id, function (order) {
                                newOrders.push(order);
                            });
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.LIMIT,
                                    datetime: new Date(),
                                    size: 3000,
                                    limit_price: 4000,
                                    entry_price: 5000,
                                    exit_price: 6000,
                                    stop_price: 6000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.SHORT,
                                    leverage: 2
                                }, token)];
                        case 3:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(newOrders.length).to.be.greaterThan(0);
                            newOrders = [];
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: new Date(),
                                    size: 1000,
                                    limit_price: 2000,
                                    entry_price: 1500,
                                    exit_price: 1000,
                                    stop_price: 1000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 50
                                }, token)];
                        case 4:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(newOrders.length).to.be.greaterThan(0);
                            newOrders = [];
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: new Date(),
                                    size: 1000,
                                    limit_price: 2000,
                                    entry_price: 1500,
                                    exit_price: 1000,
                                    stop_price: 1000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 50
                                }, token)];
                        case 5:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(newOrders.length).to.be.greaterThan(0);
                            newOrders = [];
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: new Date(),
                                    size: 1000,
                                    limit_price: 2000,
                                    entry_price: 1500,
                                    exit_price: 1000,
                                    stop_price: 1000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 50
                                }, token)];
                        case 6:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(newOrders.length).to.be.greaterThan(0);
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: new Date(),
                                    size: 500,
                                    limit_price: 2000,
                                    entry_price: 1500,
                                    exit_price: 1000,
                                    stop_price: 1000,
                                    maker_only: true,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 50
                                }, token)];
                        case 7:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(result._payload.openPositon).to.not.be.eq(undefined);
                            chai_1.expect(typeof result._payload.openPositon.id).to.be.eq("string");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should cancel an open order', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, oldFunds, result, cancelResult, newFunds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(15000);
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: testData.email,
                                    password: testData.password
                                })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, user_1.default.fetchAccount({
                                    fields: ['id'],
                                    relations: [columnNames_1.CN_USER_INCLUDE_REL.funds]
                                }, token)];
                        case 2:
                            oldFunds = (_a.sent())._payload.funds.btc_ammount;
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.LIMIT,
                                    datetime: new Date(),
                                    size: 100,
                                    limit_price: 4000,
                                    entry_price: 5000,
                                    exit_price: 6000,
                                    stop_price: 6000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 0
                                }, token)];
                        case 3:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            return [4 /*yield*/, new Promise(function (accept) {
                                    setTimeout(function () {
                                        accept();
                                    }, 10000);
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, order_1.default.cancelOpenOrder({
                                    orderId: result._payload.record.id
                                }, token)];
                        case 5:
                            cancelResult = _a.sent();
                            chai_1.expect(cancelResult._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            return [4 /*yield*/, user_1.default.fetchAccount({
                                    fields: ['id'],
                                    relations: [columnNames_1.CN_USER_INCLUDE_REL.funds]
                                }, token)];
                        case 6:
                            newFunds = (_a.sent())._payload.funds.btc_ammount;
                            chai_1.expect(newFunds).to.be.eq(oldFunds);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should fetch the open order and limit them to 1', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, openOrders;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, order_1.default.fetchOpenOrders({
                                    skip: 0,
                                    limit: 0,
                                    orderBy: columnNames_1.CN_OPEN_ORDER.createdAt,
                                    order: query_1.QUERY_ORDER_DIR.ASC,
                                    includedRel: [
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.price_copy,
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.openPosition,
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.user
                                    ]
                                }, token)];
                        case 2:
                            openOrders = _a.sent();
                            chai_1.expect(openOrders._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(openOrders._payload.records.length).to.be.greaterThan(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should test the open orders update', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, openOrderCreationResult, openOrders, editedOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: null,
                                    size: 3000,
                                    limit_price: 4000,
                                    entry_price: 5000,
                                    exit_price: 6000,
                                    stop_price: 6000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 2
                                }, "")];
                        case 2:
                            openOrderCreationResult = _a.sent();
                            chai_1.expect(openOrderCreationResult._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.INVALID_TOKEN);
                            return [4 /*yield*/, order_1.default.fetchOpenOrders({
                                    skip: 0,
                                    limit: 0,
                                    orderBy: columnNames_1.CN_OPEN_ORDER.createdAt,
                                    order: query_1.QUERY_ORDER_DIR.ASC,
                                    includedRel: [
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.price_copy,
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.openPosition,
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.user
                                    ]
                                }, token)];
                        case 3:
                            openOrders = _a.sent();
                            chai_1.expect(openOrders._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(openOrders._payload.records.length).to.be.greaterThan(0);
                            return [4 /*yield*/, order_1.default.updateOpenOrder({
                                    field: {
                                        stop_price: 4000,
                                        exit_price: 3000
                                    }, orderId: openOrders._payload.records[0].id
                                }, token)];
                        case 4:
                            editedOrder = _a.sent();
                            chai_1.expect(editedOrder._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(editedOrder._payload.newRecord).to.not.be.eq(null);
                            chai_1.expect(editedOrder._payload.newRecord.exit_price).to.be.eq(3000);
                            chai_1.expect(editedOrder._payload.newRecord.stop_price).to.be.eq(4000);
                            chai_1.expect(editedOrder._payload.oldRecord.exit_price).to.be.eq(openOrders._payload.records[0].exit_price);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should test the cancel open order functionality', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, result, userWithFunds, cancelResult, openOrders;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(5000);
                            console.log("Should test the cancel open order functionality -- 1");
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: testData.email,
                                    password: testData.password
                                })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.LIMIT,
                                    datetime: null,
                                    size: 3000,
                                    limit_price: 4000,
                                    entry_price: 5000,
                                    exit_price: 6000,
                                    stop_price: 6000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.SHORT,
                                    leverage: 2
                                }, token)];
                        case 2:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            console.log("Should test the cancel open order functionality -- 2");
                            console.log("Should test the cancel open order functionality -- 3");
                            return [4 /*yield*/, user_1.default.fetchAccount({
                                    fields: ['id'],
                                    relations: [columnNames_1.CN_USER_INCLUDE_REL.funds]
                                }, token)];
                        case 3:
                            userWithFunds = _a.sent();
                            chai_1.expect(userWithFunds._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            return [4 /*yield*/, order_1.default.cancelOpenOrder({
                                    orderId: result._payload.record.id
                                }, token)];
                        case 4:
                            cancelResult = _a.sent();
                            console.log("Should test the cancel open order functionality -- 4");
                            return [4 /*yield*/, user_1.default.fetchAccount({
                                    fields: ['id'],
                                    relations: [columnNames_1.CN_USER_INCLUDE_REL.funds]
                                }, token)];
                        case 5:
                            userWithFunds = _a.sent();
                            chai_1.expect(userWithFunds._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(userWithFunds._payload.funds.btc_ammount).to.be.eq(cancelResult._payload.funds.btc_ammount);
                            console.log("Should test the cancel open order functionality -- 5");
                            return [4 /*yield*/, order_1.default.fetchOpenOrders({
                                    skip: 0,
                                    limit: 0,
                                    orderBy: columnNames_1.CN_OPEN_ORDER.createdAt,
                                    order: query_1.QUERY_ORDER_DIR.ASC,
                                    includedRel: [
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.price_copy,
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.openPosition,
                                        columnNames_1.CN_OPEN_ORDER_INCLUDE_REL.user
                                    ],
                                    exact: {
                                        id: result._payload.record.id
                                    }
                                }, token)];
                        case 6:
                            openOrders = _a.sent();
                            chai_1.expect(openOrders._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(openOrders._payload.records.length).to.be.eq(0);
                            console.log("Should test the cancel open order functionality -- 6");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should test the open positions fetch', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, result, openPositions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: null,
                                    size: 500,
                                    limit_price: 2000,
                                    entry_price: 1500,
                                    exit_price: 1000,
                                    stop_price: 1000,
                                    maker_only: true,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 50
                                }, token)];
                        case 2:
                            result = _a.sent();
                            chai_1.expect(result._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            return [4 /*yield*/, order_1.default.fetchOpenPositions({
                                    order: query_1.QUERY_ORDER_DIR.ASC,
                                    orderBy: columnNames_1.CN_OPEN_POSITION.createdAt,
                                    skip: 0,
                                    limit: 0
                                }, token)];
                        case 3:
                            openPositions = _a.sent();
                            chai_1.expect(openPositions._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(openPositions._payload.records.length).to.be.greaterThan(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should edit the open positions', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, openPositions, editingPosition, newUpdateResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, order_1.default.fetchOpenPositions({
                                    order: query_1.QUERY_ORDER_DIR.ASC,
                                    orderBy: columnNames_1.CN_OPEN_POSITION.createdAt,
                                    skip: 0,
                                    limit: 0,
                                    lesserThan: {
                                        createdAt: new Date()
                                    }
                                }, token)];
                        case 2:
                            openPositions = _a.sent();
                            chai_1.expect(openPositions._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(openPositions._payload.records.length).to.be.greaterThan(0);
                            editingPosition = openPositions._payload.records[0];
                            return [4 /*yield*/, order_1.default.updateOpenPosition({
                                    field: {
                                        stop_price: 6000,
                                        exit_price: 3000
                                    },
                                    positionId: editingPosition.id
                                }, token)];
                        case 3:
                            newUpdateResult = _a.sent();
                            chai_1.expect(newUpdateResult._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(newUpdateResult._payload.oldRecord.stop_price).to.be.eq(editingPosition.stop_price);
                            chai_1.expect(newUpdateResult._payload.newRecord.exit_price).to.be.eq(3000);
                            chai_1.expect(newUpdateResult._payload.newRecord.stop_price).to.be.eq(6000);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should close open position at market price', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, openPositions, closingPosition, closedPosition, newUpdateResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, order_1.default.fetchOpenPositions({
                                    order: query_1.QUERY_ORDER_DIR.ASC,
                                    orderBy: columnNames_1.CN_OPEN_POSITION.createdAt,
                                    skip: 0,
                                    limit: 0,
                                    lesserThan: {
                                        createdAt: new Date()
                                    }
                                }, token)];
                        case 2:
                            openPositions = _a.sent();
                            closingPosition = openPositions._payload.records[0];
                            closedPosition = null;
                            order_1.default.listenOpenPositionClosedAMP(signIn._payload.id, function (order) {
                                closedPosition = order;
                            });
                            return [4 /*yield*/, order_1.default.closeOpenPositionAtMarketPrice({
                                    positionId: closingPosition.id
                                }, token)];
                        case 3:
                            newUpdateResult = _a.sent();
                            chai_1.expect(newUpdateResult._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(typeof newUpdateResult._payload.historyId).to.be.eq("string");
                            chai_1.expect(closedPosition).to.not.be.eq(null);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should fetch positions history', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, positionHistoryFetchResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, order_1.default.fetchPositionHistory({
                                    order: query_1.QUERY_ORDER_DIR.ASC,
                                    orderBy: columnNames_1.CN_POSITION_HISTORY.createdAt,
                                    skip: 0,
                                    limit: 0,
                                    lesserThan: {
                                        createdAt: new Date()
                                    }
                                }, token)];
                        case 2:
                            positionHistoryFetchResponse = _a.sent();
                            chai_1.expect(positionHistoryFetchResponse._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(positionHistoryFetchResponse._payload.records.length).to.be.greaterThan(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Shold test the order listeners...', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, OpenOrdersList, cancellOOrders, removedOOrders, newOpenOrderResponse, openOrderRemoveResult, openPositionsList, openPositionsRemoved, openPositionsClosed, closeResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(200000);
                            return [4 /*yield*/, auth_1.default.signIn({
                                    email: testData.email,
                                    password: testData.password
                                })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            OpenOrdersList = [];
                            cancellOOrders = [];
                            removedOOrders = [];
                            order_1.default.listenNewOrderAdded(signIn._payload.id, function (order) {
                                OpenOrdersList.push(order);
                            });
                            order_1.default.listenOpenOrderCancelled(signIn._payload.id, function (order) {
                                cancellOOrders.push(order);
                            });
                            order_1.default.listenOpenOrderRemoved(signIn._payload.id, function (order) {
                                removedOOrders.push(order);
                            });
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: null,
                                    size: 500,
                                    limit_price: 2000,
                                    entry_price: 1500,
                                    exit_price: 1000,
                                    stop_price: 1000,
                                    maker_only: false,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 50
                                }, token)];
                        case 2:
                            newOpenOrderResponse = _a.sent();
                            chai_1.expect(newOpenOrderResponse._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(OpenOrdersList.length).to.be.eq(1);
                            return [4 /*yield*/, order_1.default.cancelOpenOrder({
                                    orderId: OpenOrdersList[0].id
                                }, token)];
                        case 3:
                            openOrderRemoveResult = _a.sent();
                            OpenOrdersList = OpenOrdersList.splice(0, 1);
                            chai_1.expect(openOrderRemoveResult._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(cancellOOrders.length).to.be.greaterThan(0);
                            chai_1.expect(removedOOrders.length).to.be.greaterThan(0);
                            openPositionsList = [];
                            order_1.default.listenNewOpenPositionAdded(signIn._payload.id, function (order) {
                                openPositionsList.push(order);
                            });
                            return [4 /*yield*/, order_1.default.createNewOrder({
                                    pair: symbols_1.PAIR.BTC_USD,
                                    order_type: order_2.ORDER_TYPE.MARKET_ORDER,
                                    datetime: null,
                                    size: 500,
                                    limit_price: 2000,
                                    entry_price: 1500,
                                    exit_price: 1000,
                                    stop_price: 1000,
                                    maker_only: true,
                                    side: order_2.ORDER_SIDE.LONG,
                                    leverage: 50
                                }, token)];
                        case 4:
                            newOpenOrderResponse = _a.sent();
                            chai_1.expect(newOpenOrderResponse._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            return [4 /*yield*/, new Promise(function (accept) {
                                    setTimeout(function () {
                                        accept();
                                    }, 15000);
                                })];
                        case 5:
                            _a.sent();
                            chai_1.expect(openPositionsList.length).to.be.greaterThan(0);
                            return [4 /*yield*/, order_1.default.fetchOpenPositions({ order: query_1.QUERY_ORDER_DIR.ASC,
                                    orderBy: columnNames_1.CN_OPEN_POSITION.createdAt,
                                    skip: 0,
                                    limit: 0,
                                    lesserThan: {
                                        createdAt: new Date()
                                    }
                                }, token)];
                        case 6:
                            openPositionsList = (_a.sent())._payload.records;
                            openPositionsRemoved = [];
                            openPositionsClosed = [];
                            order_1.default.listenOpenPositionRemoved(signIn._payload.id, function (order) {
                                openPositionsRemoved.push(order);
                            });
                            order_1.default.listenOpenPositionClosedAMP(signIn._payload.id, function (order) {
                                openPositionsClosed.push(order);
                            });
                            return [4 /*yield*/, order_1.default.closeOpenPositionAtMarketPrice({
                                    positionId: openPositionsList[0].id
                                }, token)];
                        case 7:
                            closeResult = _a.sent();
                            chai_1.expect(closeResult._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(openPositionsClosed.length).to.be.greaterThan(0);
                            chai_1.expect(openPositionsRemoved.length).to.be.greaterThan(0);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('It should test the deposit functionality', function () {
        it('Should test the main functionality --> Deposit into an account', function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, signIn, funds, oldAmmount, newDeposits, newFunds, creationResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, auth_1.default.signIn({
                                email: testData.email,
                                password: testData.password
                            })];
                        case 1:
                            signIn = _a.sent();
                            chai_1.expect(signIn._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            token = signIn._payload.authToken;
                            return [4 /*yield*/, user_1.default.fetchAccount({
                                    fields: ['id'],
                                    relations: [columnNames_1.CN_USER_INCLUDE_REL.funds]
                                }, token)];
                        case 2:
                            funds = (_a.sent())._payload.funds;
                            console.log("Current funds: ", funds);
                            oldAmmount = funds.btc_ammount;
                            console.log("oldAmmount: ", oldAmmount);
                            newDeposits = [];
                            deposit_1.default.listenNewDepositAdded(signIn._payload.id, function (deposit) {
                                newDeposits.push(deposit);
                            });
                            funds_1.default.listenFundsUpdated(signIn._payload.id, function (updatedFunds) {
                                newFunds = updatedFunds;
                            });
                            return [4 /*yield*/, deposit_1.default.createNewDeposit({
                                    btc_ammount: 3,
                                    btc_address: "asldjaksdklajsdklajslkdjaklsdj"
                                }, token)];
                        case 3:
                            creationResponse = _a.sent();
                            chai_1.expect(creationResponse._meta._statusCode).to.be.eq(codes_1.RESULT_CODE.SUCCESS);
                            chai_1.expect(creationResponse._payload.newFunds.btc_ammount).to.be.eq(utils_1.Utils.Instance.normalizeBitcoinAmmount(oldAmmount + 3));
                            chai_1.expect(newFunds.btc_ammount).to.be.eq(utils_1.Utils.Instance.normalizeBitcoinAmmount(oldAmmount + 3));
                            chai_1.expect(newDeposits.length).to.be.eq(1);
                            return [4 /*yield*/, user_1.default.fetchAccount({
                                    fields: ['id'],
                                    relations: [columnNames_1.CN_USER_INCLUDE_REL.funds]
                                }, token)];
                        case 4:
                            funds = (_a.sent())._payload.funds;
                            chai_1.expect(funds.btc_ammount).to.be.eq(utils_1.Utils.Instance.normalizeBitcoinAmmount(oldAmmount + 3));
                            console.log("\n\n\nnewFunds: \n\n", newFunds);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=main.spec.js.map