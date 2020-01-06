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
var columnNames_1 = require("../_client/enums/columnNames");
var utils_1 = require("../_client/utils");
var typeorm_1 = require("typeorm");
var Deposit_1 = require("../controller/Deposit");
var DepositRouteHandler = /** @class */ (function () {
    function DepositRouteHandler() {
    }
    Object.defineProperty(DepositRouteHandler, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    DepositRouteHandler.prototype.handleDepositRequest = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var ROUTE, payload, _payload, _resultCode, invalidCode, userToken, e_1, user, oldFunds, depositResult, e_2, e_3, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.DEPOSIT_ROUTES.CREATE;
                        _payload = { newRecord: null, oldFunds: null, newFunds: null };
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
                        e_1 = _a.sent();
                        invalidCode = codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(invalidCode === codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 19];
                        console.log("handleDepositRequest-- 2");
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 17, , 18]);
                        console.log("handleDepositRequest-- 3");
                        return [4 /*yield*/, User_1.default.one({
                                where: {
                                    id: userToken.user.id
                                },
                                select: ['id'],
                                relations: [columnNames_1.CN_USER_INCLUDE_REL.funds]
                            })];
                    case 10:
                        user = _a.sent();
                        if (!(user && user.funds)) return [3 /*break*/, 15];
                        _a.label = 11;
                    case 11:
                        _a.trys.push([11, 13, , 14]);
                        oldFunds = user.funds.toJson();
                        return [4 /*yield*/, Deposit_1.default.makeDeposit(user, request._payload.btc_ammount, request._payload.btc_address)];
                    case 12:
                        depositResult = _a.sent();
                        //_payload.oldRecord = oldFunds;
                        if (depositResult) {
                            _resultCode = codes_1.RESULT_CODE.SUCCESS;
                            _payload.oldFunds = oldFunds;
                            _payload.newFunds = depositResult.newFunds.toJson();
                            _payload.newRecord = depositResult.deposit.toJson();
                        }
                        else {
                            console.log(depositResult);
                            _resultCode = codes_1.RESULT_CODE.ERROR_MAKING_DEPOSIT;
                        }
                        return [3 /*break*/, 14];
                    case 13:
                        e_2 = _a.sent();
                        console.log("handleDepositRequest-- 6");
                        _resultCode = codes_1.RESULT_CODE.ERROR_MAKING_DEPOSIT;
                        return [3 /*break*/, 14];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        console.log("handleDepositRequest-- 7");
                        _resultCode = codes_1.RESULT_CODE.USER_NOT_FOUND;
                        _a.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        e_3 = _a.sent();
                        console.log("handleDepositRequest-- 10");
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 18];
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        console.log("handleDepositRequest-- 11");
                        _resultCode = invalidCode || codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        _a.label = 20;
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        e_4 = _a.sent();
                        console.log("handleDepositRequest-- 12");
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
    DepositRouteHandler.prototype.handleDepositsFetch = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, ROUTE, _payload, _resultCode, invalidCode, userToken, e_5, user, options_1, notAllowedFields_1, openOrders, e_6, e_7, e_8, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ROUTE = routes_1.DEPOSIT_ROUTES.FETCH;
                        _payload = { records: null };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 19, , 20]);
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
                        e_5 = _b.sent();
                        invalidCode = codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(invalidCode === codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 17];
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 15, , 16]);
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
                        _b.label = 11;
                    case 11:
                        _b.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, Deposit_1.default.all(options_1)];
                    case 12:
                        openOrders = _b.sent();
                        _resultCode = codes_1.RESULT_CODE.SUCCESS;
                        _payload.records = openOrders.map(function (element) {
                            return element.toJson();
                        });
                        return [3 /*break*/, 14];
                    case 13:
                        e_6 = _b.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 14];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        e_7 = _b.sent();
                        console.log(e_7);
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 16];
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        _resultCode = invalidCode;
                        _b.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        e_8 = _b.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 20];
                    case 20:
                        payload = utils_1.default
                            .assembleResponsePayload(utils_1.default.assembleResponseMeta(request._meta, _resultCode), _payload);
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    DepositRouteHandler._instance = new DepositRouteHandler();
    return DepositRouteHandler;
}());
exports.DepositRouteHandler = DepositRouteHandler;
exports.default = DepositRouteHandler.Instance;
//# sourceMappingURL=deposit.js.map