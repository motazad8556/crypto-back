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
var User_1 = require("../controller/User");
var Auth_1 = require("../manager/Auth");
var routes_1 = require("../_client/enums/routes");
var utils_1 = require("../_client/utils");
var UserRouteHandler = /** @class */ (function () {
    function UserRouteHandler() {
    }
    Object.defineProperty(UserRouteHandler, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UserRouteHandler.prototype.handleUserAccountUpdate = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, ROUTE, _payload, _resultCode, resultCodeA, userToken, e_1, user, updatePayload, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.AUTH_ROUTES.UPDATE_ACCOUNT;
                        _payload = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 17, , 18]);
                        resultCodeA = null;
                        userToken = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, Auth_1.default.parseToken(request._meta._authToken)];
                    case 3:
                        userToken = _a.sent();
                        if (!!userToken) return [3 /*break*/, 4];
                        resultCodeA = codes_1.RESULT_CODE.INVALID_TOKEN;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, RequestValidator_1.default.validateCall(ROUTE, request)];
                    case 5:
                        resultCodeA = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        resultCodeA = codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(resultCodeA === codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 15];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 13, , 14]);
                        return [4 /*yield*/, User_1.default.one({
                                where: {
                                    email: userToken.user.email
                                }
                            })];
                    case 10:
                        user = _a.sent();
                        updatePayload = request._payload;
                        user.country = updatePayload.country ? updatePayload.country : user.country;
                        user.firstName = updatePayload.firstName ? updatePayload.firstName : user.firstName;
                        user.lastName = updatePayload.lastName ? updatePayload.lastName : user.lastName;
                        user.username = updatePayload.username ? updatePayload.username : user.username;
                        user.photo = updatePayload.photo ? updatePayload.photo : user.photo;
                        if (updatePayload.password) {
                            // Update email -- Special proceedure here
                        }
                        if (updatePayload.email) {
                            //Update password -- Special Proceedure Here
                        }
                        return [4 /*yield*/, User_1.default.save(user)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, User_1.default.one({
                                where: {
                                    id: user.id
                                },
                                select: ['updatedAt']
                            })];
                    case 12:
                        user = _a.sent();
                        _payload.updatedAt = user.updatedAt.getTime();
                        _resultCode = codes_1.RESULT_CODE.SUCCESS;
                        return [3 /*break*/, 14];
                    case 13:
                        e_2 = _a.sent();
                        console.log(e_2);
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 14];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        _resultCode = resultCodeA;
                        _a.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        e_3 = _a.sent();
                        console.log(e_3);
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 18];
                    case 18:
                        payload = utils_1.default
                            .assembleResponsePayload(utils_1.default.assembleResponseMeta(request._meta, _resultCode), _payload);
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRouteHandler.prototype.handleUserAccountFetch = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, ROUTE, _payload, _resultCode, invalidCode, userToken, e_4, options, user, e_5, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ROUTE = routes_1.AUTH_ROUTES.FETCH_ACCOUNT;
                        _payload = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 15, , 16]);
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
                        e_4 = _a.sent();
                        invalidCode = codes_1.RESULT_CODE.INVALID_PAYLOAD;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(invalidCode === codes_1.RESULT_CODE.SUCCESS)) return [3 /*break*/, 13];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        options = {
                            where: {
                                id: userToken.user.id
                            },
                            select: request._payload.fields,
                            relations: (function () {
                                if (request._payload.relations && request._payload.relations.length > 0) {
                                    return request._payload.relations;
                                }
                                return [];
                            })()
                        };
                        return [4 /*yield*/, User_1.default.one(options)];
                    case 10:
                        user = _a.sent();
                        if (user) {
                            _resultCode = codes_1.RESULT_CODE.SUCCESS;
                            _payload = user.toJson();
                        }
                        else {
                            _resultCode = codes_1.RESULT_CODE.USER_NOT_FOUND;
                        }
                        return [3 /*break*/, 12];
                    case 11:
                        e_5 = _a.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        _resultCode = invalidCode;
                        _a.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        e_6 = _a.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 16];
                    case 16:
                        payload = utils_1.default
                            .assembleResponsePayload(utils_1.default.assembleResponseMeta(request._meta, _resultCode), _payload);
                        socketInstance.emit(ROUTE, payload);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRouteHandler._instance = new UserRouteHandler();
    return UserRouteHandler;
}());
exports.UserRouteHandler = UserRouteHandler;
exports.default = UserRouteHandler.Instance;
//# sourceMappingURL=user.js.map