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
var Auth_1 = require("../manager/Auth");
var routes_1 = require("../_client/enums/routes");
var PositionHistory_1 = require("../controller/PositionHistory");
var typeorm_1 = require("typeorm");
var User_1 = require("../controller/User");
var utils_1 = require("../_client/utils");
var PositionHistoryRouteHandler = /** @class */ (function () {
    function PositionHistoryRouteHandler() {
    }
    Object.defineProperty(PositionHistoryRouteHandler, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    PositionHistoryRouteHandler.prototype.handlePositionHistoryFetch = function (socketInstance, request) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, ROUTE, _payload, _resultCode, invalidCode, userToken, e_1, user, options_1, notAllowedFields_1, openPositions, e_2, e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ROUTE = routes_1.POSITION_HISTORY_ROUTES.FETCH;
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
                        e_1 = _b.sent();
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
                            take: request._payload.limit ? request._payload.limit : 0,
                            relations: request._payload.includedRel ? request._payload.includedRel : []
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
                        if (request._payload.greaterThan && Object.keys(request._payload.greaterThan).length > 0) {
                            Object.keys(request._payload.greaterThan)
                                .filter(function (key) {
                                return notAllowedFields_1.indexOf(key) < 0;
                            })
                                .forEach(function (key) {
                                options_1.where[key] = typeorm_1.MoreThan(request._payload.greaterThan[key]);
                            });
                        }
                        if (request._payload.lesserThan && Object.keys(request._payload.lesserThan).length > 0) {
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
                        return [4 /*yield*/, PositionHistory_1.default.all(options_1)];
                    case 11:
                        openPositions = _b.sent();
                        _payload.records = openPositions.map(function (element) {
                            return element.toJson();
                        });
                        _resultCode = codes_1.RESULT_CODE.SUCCESS;
                        return [3 /*break*/, 13];
                    case 12:
                        e_2 = _b.sent();
                        _resultCode = codes_1.RESULT_CODE.INTERNAL_ERROR;
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        _resultCode = invalidCode || codes_1.RESULT_CODE.INTERNAL_ERROR;
                        _b.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        e_3 = _b.sent();
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
    PositionHistoryRouteHandler._instance = new PositionHistoryRouteHandler();
    return PositionHistoryRouteHandler;
}());
exports.PositionHistoryRouteHandler = PositionHistoryRouteHandler;
exports.default = PositionHistoryRouteHandler.Instance;
//# sourceMappingURL=positionHistory.js.map