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
var RequestValidator_1 = require("../manager/RequestValidator");
var codes_1 = require("../_client/enums/codes");
var User_1 = require("../entity/User");
var User_2 = require("../controller/User");
var Auth_1 = require("../entity/Auth");
var Auth_2 = require("../manager/Auth");
var Auth_3 = require("../controller/Auth");
var routes_1 = require("../_client/enums/routes");
var Funds_1 = require("../entity/Funds");
var utils_1 = require("../_client/utils");
var AuthRouteHandler = /** @class */ (function () {
    function AuthRouteHandler() {
    }
    Object.defineProperty(AuthRouteHandler, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @description Handles the user sign-up request
     * @param socketInstance Instance of the socket making the request
     * @param request The request payload
     */
    AuthRouteHandler.prototype.handleUserCreationRequest = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var ROUTE, invalidCode, payload, e_1, auth, user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.AUTH_ROUTES.SIGN_UP;
                        invalidCode = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 12]);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, RequestValidator_1.default.validateCall(ROUTE, request)];
                    case 3:
                        invalidCode = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        invalidCode = codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        return [3 /*break*/, 5];
                    case 5:
                        if (!(invalidCode !== codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 6];
                        payload = {
                            _meta: {
                                _id: request._meta._id,
                                _issuedAt: request._meta._issuedAt,
                                _statusCode: invalidCode
                            },
                            _payload: {}
                        };
                        return [3 /*break*/, 10];
                    case 6:
                        auth = new Auth_1.Auth();
                        auth.salt = Auth_2.default.genSalt();
                        auth.hash = Auth_2.default.hashPassword(request._payload.password, auth.salt);
                        return [4 /*yield*/, Auth_3.default.create(auth)];
                    case 7:
                        auth = _a.sent();
                        user = new User_1.User();
                        user.auth = auth;
                        user.firstName = request._payload.firstName;
                        user.lastName = request._payload.lastName;
                        user.country = request._payload.country;
                        user.email = request._payload.email;
                        user.username = request._payload.username;
                        user.photo = request._payload.photo ? request._payload.photo : null;
                        user.funds = new Funds_1.Funds();
                        user.funds.btc_ammount = process.env.DEF_FUNDS ? parseInt(process.env.DEF_FUNDS) : 0;
                        return [4 /*yield*/, User_2.default.create(user)];
                    case 8:
                        user = _a.sent();
                        return [4 /*yield*/, User_2.default.one({
                                where: {
                                    id: user.id
                                },
                                relations: ['funds']
                            })];
                    case 9:
                        user = _a.sent();
                        payload = {
                            _meta: {
                                _id: request._meta._id,
                                _issuedAt: request._meta._issuedAt,
                                _statusCode: codes_1.RESULT_CODE.SUCCESS
                            },
                            _payload: {
                                id: user.id,
                                createdAt: user.createdAt.getTime()
                            }
                        };
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_2 = _a.sent();
                        console.log(e_2);
                        payload = {
                            _meta: {
                                _id: request._meta._id,
                                _issuedAt: request._meta._issuedAt,
                                _statusCode: codes_1.RESULT_CODE.INTERNAL_ERROR
                            },
                            _payload: {}
                        };
                        return [3 /*break*/, 12];
                    case 12:
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param socketInstance Instance of the socket making the request
     * @param request The request payload
     * @description Handles sign-in requests
     */
    AuthRouteHandler.prototype.handleUserAuthRequest = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var ROUTE, payload, _payload, _resultCode, invalidCode, e_3, user, hasSamePassw, authToken, e_4, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.AUTH_ROUTES.SIGN_IN;
                        _payload = { authToken: null };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 14, , 15]);
                        invalidCode = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, RequestValidator_1.default.validateCall(ROUTE, request)];
                    case 3:
                        invalidCode = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        invalidCode = codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        return [3 /*break*/, 5];
                    case 5:
                        if (!(invalidCode !== codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 6];
                        _resultCode = invalidCode;
                        return [3 /*break*/, 13];
                    case 6:
                        _a.trys.push([6, 12, , 13]);
                        return [4 /*yield*/, User_2.default.one({
                                where: { email: request._payload.email.trim().toLowerCase() },
                                select: ['id']
                            })];
                    case 7:
                        user = _a.sent();
                        return [4 /*yield*/, Auth_2.default.hasSamePassword(user.id, request._payload.password)];
                    case 8:
                        hasSamePassw = _a.sent();
                        if (!hasSamePassw) return [3 /*break*/, 10];
                        return [4 /*yield*/, Auth_2.default.getJWToken(request._payload.email.trim().toLowerCase())];
                    case 9:
                        authToken = _a.sent();
                        _payload = { authToken: authToken, id: user.id };
                        _resultCode = codes_1.RESULT_CODE.SUCCESS;
                        return [3 /*break*/, 11];
                    case 10:
                        _resultCode = codes_1.RESULT_CODE.INVALID_PASSWORD;
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        e_4 = _a.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        e_5 = _a.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 15];
                    case 15:
                        payload = utils_1.default.assembleResponsePayload(utils_1.default.assembleResponseMeta(request._meta, _resultCode), _payload);
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param socketInstance Instance of the socket making the request
     * @param request The request payload
     * @description Handles sign-in requests
     */
    AuthRouteHandler.prototype.handleUserChangePasswordRequest = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var ROUTE, payload, _payload, _resultCode, invalidCode, e_6, authToken, e_7, hasPass, e_8, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.AUTH_ROUTES.CHANGE_PASSWORD;
                        _payload = { changed: false };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 19, , 20]);
                        invalidCode = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, RequestValidator_1.default.validateCall(ROUTE, request)];
                    case 3:
                        invalidCode = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_6 = _a.sent();
                        invalidCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 5];
                    case 5:
                        if (!(invalidCode !== codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 6];
                        _resultCode = invalidCode;
                        return [3 /*break*/, 18];
                    case 6:
                        _a.trys.push([6, 17, , 18]);
                        authToken = void 0;
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, Auth_2.default.parseToken(request._meta._authToken)];
                    case 8:
                        authToken = _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        e_7 = _a.sent();
                        return [3 /*break*/, 10];
                    case 10:
                        if (!authToken) return [3 /*break*/, 15];
                        return [4 /*yield*/, Auth_2.default.hasSamePassword(authToken.user.id, request._payload.password)];
                    case 11:
                        hasPass = _a.sent();
                        if (!hasPass) return [3 /*break*/, 13];
                        return [4 /*yield*/, Auth_2.default.changeUserPassword(authToken.user.id, request._payload.newPassword)];
                    case 12:
                        _a.sent();
                        _payload.changed = true;
                        _resultCode = codes_1.RESULT_CODE.SUCCESS;
                        return [3 /*break*/, 14];
                    case 13:
                        _resultCode = codes_1.RESULT_CODE.INVALID_PASSWORD;
                        _a.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        _resultCode = codes_1.RESULT_CODE.INVALID_TOKEN;
                        _a.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        e_8 = _a.sent();
                        console.log(e_8);
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 18];
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        e_9 = _a.sent();
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
    AuthRouteHandler._instance = new AuthRouteHandler();
    return AuthRouteHandler;
}());
exports.AuthRouteHandler = AuthRouteHandler;
exports.default = AuthRouteHandler.Instance;
//# sourceMappingURL=auth.js.map