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
var SyntaxValidator_1 = require("./SyntaxValidator");
var User_1 = require("../controller/User");
var symbols_1 = require("../_client/enums/symbols");
var order_1 = require("../_client/enums/order");
var query_1 = require("../_client/enums/query");
var columnNames_1 = require("../_client/enums/columnNames");
routes_1.OPEN_POSITION_ROUTES;
var PayloadValidator = /** @class */ (function () {
    function PayloadValidator() {
    }
    Object.defineProperty(PayloadValidator, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    PayloadValidator.prototype.validateRequestPayload = function (route, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var reqPayload, reqPayload, reqPayload, reqPayload, reqPayload, reqPayload, reqPayload, reqPayload, reqPayload, possibleRels_1, invalidRel, reqPayload, possibleRels_2, invalidRel, reqPayload, reqPayload, reqPayload, reqPayload, reqPayload;
            return __generator(this, function (_a) {
                if (route === routes_1.AUTH_ROUTES.SIGN_UP) {
                    reqPayload = payload;
                    if (!SyntaxValidator_1.default.hasValidEmail(reqPayload.email) ||
                        !SyntaxValidator_1.default.hasValidPassword(reqPayload.password) ||
                        ((reqPayload.country && !SyntaxValidator_1.default.hasValidCountry(reqPayload.country))
                            ||
                                (reqPayload.firstName && !SyntaxValidator_1.default.hasValidFirstName(reqPayload.firstName))
                            ||
                                //(reqPayload.photo && !(reqPayload.photo ? SyntaxValidator.hasValidBase64Image(reqPayload.photo) : true))
                                //||
                                (reqPayload.lastName && !SyntaxValidator_1.default.hasValidLastName(reqPayload.lastName)))) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.AUTH_ROUTES.SIGN_IN) {
                    reqPayload = payload;
                    if (!SyntaxValidator_1.default.hasValidEmail(reqPayload.email)
                        || !reqPayload.password) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.AUTH_ROUTES.UPDATE_ACCOUNT) {
                    reqPayload = payload;
                    if ((reqPayload.country && !SyntaxValidator_1.default.hasValidCountry(reqPayload.country)) ||
                        (reqPayload.password && !SyntaxValidator_1.default.hasValidPassword(reqPayload.password)) ||
                        (reqPayload.email && !SyntaxValidator_1.default.hasValidEmail(reqPayload.email)) ||
                        (reqPayload.firstName && !SyntaxValidator_1.default.hasValidFirstName(reqPayload.firstName)) ||
                        (reqPayload.lastName && !SyntaxValidator_1.default.hasValidLastName(reqPayload.lastName)) ||
                        (reqPayload.photo && (reqPayload.photo ? SyntaxValidator_1.default.hasValidBase64Image(reqPayload.photo) : true))) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.AUTH_ROUTES.CHANGE_PASSWORD) {
                    reqPayload = payload;
                    if (!reqPayload.password || !SyntaxValidator_1.default.hasValidPassword(reqPayload.password)) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.PRICE_ROUTES.PRICE_GET_XBT) {
                    reqPayload = payload;
                    if (!reqPayload.symbol || Object.values(symbols_1.SYMBOL).indexOf(reqPayload.symbol) < 0) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.OPEN_POSITION_ROUTES.FETCH) {
                    reqPayload = payload;
                    if ((typeof (reqPayload.limit) !== "undefined" && typeof (reqPayload.limit) !== "number")
                        || (typeof (reqPayload.skip) !== "undefined" && typeof (reqPayload.skip) !== "number")
                        || (typeof (reqPayload.limit) !== "undefined" && typeof (reqPayload.limit) !== "number")
                        || (typeof (reqPayload.orderBy) !== "undefined" && typeof (reqPayload.orderBy) !== "string")
                        || (typeof (reqPayload.order) !== "undefined" && Object.values(query_1.QUERY_ORDER_DIR).indexOf(reqPayload.order) < 0)) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.OPEN_POSITION_ROUTES.UPDATE) {
                    reqPayload = payload;
                    if (typeof reqPayload.positionId !== "string"
                        || ((typeof reqPayload.field.stop_price !== "undefined") && (isNaN(reqPayload.field.stop_price) || reqPayload.field.stop_price < 1))
                        || ((typeof reqPayload.field.exit_price !== "undefined") && (isNaN(reqPayload.field.exit_price) || reqPayload.field.exit_price < 1))) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.OPEN_POSITION_ROUTES.CLOSE_AMP) {
                    reqPayload = payload;
                    if (typeof reqPayload.positionId !== "string") {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.OPEN_ORDER_ROUTES.FETCH) {
                    reqPayload = payload;
                    if ((typeof (reqPayload.limit) !== "undefined" && typeof (reqPayload.limit) !== "number")
                        || (typeof (reqPayload.skip) !== "undefined" && typeof (reqPayload.skip) !== "number")
                        || (typeof (reqPayload.limit) !== "undefined" && typeof (reqPayload.limit) !== "number")
                        || (typeof (reqPayload.orderBy) !== "undefined" && typeof (reqPayload.orderBy) !== "string")
                        || (typeof (reqPayload.order) !== "undefined" && Object.values(query_1.QUERY_ORDER_DIR).indexOf(reqPayload.order) < 0)) {
                        return [2 /*return*/, false];
                    }
                    //We evaluate the inluded relationships are valid
                    if (reqPayload.includedRel && reqPayload.includedRel.length > 0) {
                        possibleRels_1 = Object.values(columnNames_1.CN_OPEN_ORDER_INCLUDE_REL);
                        invalidRel = reqPayload.includedRel.find(function (el) {
                            return possibleRels_1.indexOf(el) < 0;
                        });
                        if (invalidRel) {
                            return [2 /*return*/, false];
                        }
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.POSITION_HISTORY_ROUTES.FETCH) {
                    reqPayload = payload;
                    if ((typeof (reqPayload.limit) !== "undefined" && typeof (reqPayload.limit) !== "number")
                        || (typeof (reqPayload.skip) !== "undefined" && typeof (reqPayload.skip) !== "number")
                        || (typeof (reqPayload.limit) !== "undefined" && typeof (reqPayload.limit) !== "number")
                        || (typeof (reqPayload.orderBy) !== "undefined" && typeof (reqPayload.orderBy) !== "string")
                        || (typeof (reqPayload.order) !== "undefined" && Object.values(query_1.QUERY_ORDER_DIR).indexOf(reqPayload.order) < 0)) {
                        return [2 /*return*/, false];
                    }
                    //We evaluate the inluded relationships are valid
                    if (reqPayload.includedRel && reqPayload.includedRel.length > 0) {
                        possibleRels_2 = Object.values(columnNames_1.CN_POSITION_HISTORY_INCLUDE_REL);
                        invalidRel = reqPayload.includedRel.find(function (el) {
                            return possibleRels_2.indexOf(el) < 0;
                        });
                        if (invalidRel) {
                            return [2 /*return*/, false];
                        }
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.OPEN_ORDER_ROUTES.CREATE) {
                    reqPayload = payload;
                    if ((isNaN(reqPayload.size)
                        || isNaN(reqPayload.leverage)
                        || reqPayload.leverage > 100
                        || reqPayload.leverage < 0)
                        || isNaN(reqPayload.stop_price) || reqPayload.stop_price < 1
                        || isNaN(reqPayload.exit_price) || reqPayload.exit_price < 1
                        || isNaN(reqPayload.size) || reqPayload.size < 1) {
                        return [2 /*return*/, false];
                    }
                    switch (reqPayload.order_type) {
                        case order_1.ORDER_TYPE.LIMIT:
                            if (reqPayload.size < 1 || reqPayload.limit_price < 1) {
                                return [2 /*return*/, false];
                            }
                            break;
                        case order_1.ORDER_TYPE.MARKET_ORDER:
                            if (reqPayload.size < 1) {
                                return [2 /*return*/, false];
                            }
                            break;
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.OPEN_ORDER_ROUTES.UPDATE) {
                    reqPayload = payload;
                    if (typeof reqPayload.orderId !== "string"
                        || ((typeof reqPayload.field.exit_price !== "undefined") && isNaN(reqPayload.field.exit_price) || reqPayload.field.exit_price < 1)
                        || ((typeof reqPayload.field.stop_price !== "undefined") && (isNaN(reqPayload.field.stop_price) || reqPayload.field.stop_price < 1))) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.OPEN_ORDER_ROUTES.CANCEL) {
                    reqPayload = payload;
                    if (typeof reqPayload.orderId !== "string") {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.DEPOSIT_ROUTES.CREATE) {
                    reqPayload = payload;
                    if (typeof reqPayload.btc_address !== "string"
                        || typeof reqPayload.btc_ammount !== "number"
                        || reqPayload.btc_ammount <= 0) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                else if (route === routes_1.DEPOSIT_ROUTES.FETCH) {
                    reqPayload = payload;
                    if ((typeof (reqPayload.limit) !== "undefined" && typeof (reqPayload.limit) !== "number")
                        || (typeof (reqPayload.skip) !== "undefined" && typeof (reqPayload.skip) !== "number")
                        || (typeof (reqPayload.limit) !== "undefined" && typeof (reqPayload.limit) !== "number")
                        || (typeof (reqPayload.orderBy) !== "undefined" && typeof (reqPayload.orderBy) !== "string")
                        || (typeof (reqPayload.order) !== "undefined" && Object.values(query_1.QUERY_ORDER_DIR).indexOf(reqPayload.order) < 0)) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        });
    };
    PayloadValidator.prototype.validateRequestPayload_logical = function (route, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var reqPayload, exists, reqPayload, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(route === routes_1.AUTH_ROUTES.SIGN_UP)) return [3 /*break*/, 3];
                        reqPayload = payload;
                        return [4 /*yield*/, User_1.default.count({
                                where: {
                                    email: reqPayload.email
                                }
                            })];
                    case 1:
                        exists = _a.sent();
                        if (exists > 0) {
                            return [2 /*return*/, codes_1.RESULT_CODE.EMAIL_ALREADY_REGISTERED];
                        }
                        return [4 /*yield*/, User_1.default.count({
                                where: {
                                    username: reqPayload.username
                                }
                            })];
                    case 2:
                        exists = _a.sent();
                        if (exists > 0) {
                            return [2 /*return*/, codes_1.RESULT_CODE.USERNAME_ALREADY_REGISTERED];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 3:
                        if (!(route === routes_1.AUTH_ROUTES.SIGN_IN)) return [3 /*break*/, 5];
                        reqPayload = payload;
                        return [4 /*yield*/, User_1.default.count({
                                where: {
                                    email: reqPayload.email
                                }
                            })];
                    case 4:
                        exists = _a.sent();
                        if (exists < 1) {
                            return [2 /*return*/, codes_1.RESULT_CODE.EMAIL_DOES_NOT_EXIST];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 5: return [2 /*return*/, codes_1.RESULT_CODE.NOT_YET_IMPLEMENTED];
                }
            });
        });
    };
    PayloadValidator._instance = new PayloadValidator();
    return PayloadValidator;
}());
exports.PayloadValidator = PayloadValidator;
var RequestValidator = /** @class */ (function () {
    function RequestValidator() {
        this._payloadValidator = PayloadValidator.Instance;
    }
    Object.defineProperty(RequestValidator, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description Makes a sanity check and a auth. check to the received payload.
     */
    RequestValidator.prototype.validateCall = function (route, request) {
        return __awaiter(this, void 0, void 0, function () {
            var hasValidPayload, LOGIC_CODE, hasValidPayload, LOGIC_CODE, hasValidPayload, hasValidPayload, hasValidPayload, payload, payload, hasValidPayload, payload, hasValidPayload, payload, hasValidPayload, payload, hasValidPayload, payload, hasValidPayload, payload, hasValidPayload, payload, hasValidPayload, payload, hasValidPayload, payload, hasValidPayload, payload, hasValidPayload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!request._meta._id || !request._meta._issuedAt) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        if (!(route === routes_1.AUTH_ROUTES.SIGN_UP)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, request._payload)];
                    case 1:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload_logical(route, request._payload)];
                    case 2:
                        LOGIC_CODE = _a.sent();
                        return [2 /*return*/, LOGIC_CODE];
                    case 3:
                        if (!(route === routes_1.AUTH_ROUTES.SIGN_IN)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, request._payload)];
                    case 4:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload_logical(route, request._payload)];
                    case 5:
                        LOGIC_CODE = _a.sent();
                        return [2 /*return*/, LOGIC_CODE];
                    case 6:
                        if (!(route === routes_1.AUTH_ROUTES.UPDATE_ACCOUNT)) return [3 /*break*/, 8];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, request._payload)];
                    case 7:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 8:
                        if (!(route === routes_1.AUTH_ROUTES.CHANGE_PASSWORD)) return [3 /*break*/, 10];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, request._payload)];
                    case 9:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 10:
                        if (!(route === routes_1.PRICE_ROUTES.PRICE_GET_XBT)) return [3 /*break*/, 12];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, request._payload)];
                    case 11:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 12:
                        if (!(route === routes_1.AUTH_ROUTES.FETCH_ACCOUNT)) return [3 /*break*/, 13];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        if (!payload.fields || payload.fields.length < 1) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_FIELD_AMMOUNT];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 13:
                        if (!(route === routes_1.OPEN_ORDER_ROUTES.CREATE)) return [3 /*break*/, 15];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 14:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 15:
                        if (!(route === routes_1.OPEN_ORDER_ROUTES.FETCH)) return [3 /*break*/, 17];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 16:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 17:
                        if (!(route === routes_1.OPEN_ORDER_ROUTES.UPDATE)) return [3 /*break*/, 19];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 18:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 19:
                        if (!(route === routes_1.OPEN_ORDER_ROUTES.CANCEL)) return [3 /*break*/, 21];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 20:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 21:
                        if (!(route === routes_1.OPEN_POSITION_ROUTES.FETCH)) return [3 /*break*/, 23];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 22:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 23:
                        if (!(route === routes_1.POSITION_HISTORY_ROUTES.FETCH)) return [3 /*break*/, 25];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 24:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 25:
                        if (!(route === routes_1.OPEN_POSITION_ROUTES.UPDATE)) return [3 /*break*/, 27];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 26:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 27:
                        if (!(route === routes_1.OPEN_POSITION_ROUTES.CLOSE_AMP)) return [3 /*break*/, 29];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 28:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 29:
                        if (!(route === routes_1.DEPOSIT_ROUTES.CREATE)) return [3 /*break*/, 31];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 30:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 31:
                        if (!(route === routes_1.DEPOSIT_ROUTES.FETCH)) return [3 /*break*/, 33];
                        if (!request._meta._authToken)
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_TOKEN];
                        payload = request._payload;
                        return [4 /*yield*/, this._payloadValidator.validateRequestPayload(route, payload)];
                    case 32:
                        hasValidPayload = _a.sent();
                        if (!hasValidPayload) {
                            return [2 /*return*/, codes_1.RESULT_CODE.INVALID_PAYLOAD];
                        }
                        return [2 /*return*/, codes_1.RESULT_CODE.SUCCESS];
                    case 33: return [2 /*return*/, codes_1.RESULT_CODE.UNKNOWN_ROUTE];
                }
            });
        });
    };
    RequestValidator._instance = new RequestValidator();
    return RequestValidator;
}());
exports.RequestValidator = RequestValidator;
exports.default = RequestValidator.Instance;
//# sourceMappingURL=RequestValidator.js.map