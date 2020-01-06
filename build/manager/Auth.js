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
var bcrypt = require("bcrypt");
var User_1 = require("../controller/User");
var jwt = require("jsonwebtoken");
var Auth_1 = require("../controller/Auth");
var AuthManager = /** @class */ (function () {
    function AuthManager() {
    }
    Object.defineProperty(AuthManager, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthManager.prototype, "JWTKEY", {
        get: function () {
            return process.env.JWT_KEY || "S^YkxBroDSQ62er$";
        },
        enumerable: true,
        configurable: true
    });
    AuthManager.prototype.hashPassword = function (password, salt) {
        return bcrypt.hashSync(password, salt);
    };
    AuthManager.prototype.hasSamePassword = function (userID, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.one({
                            where: {
                                id: userID
                            },
                            relations: ['auth']
                        })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, bcrypt.compareSync(password, user.auth.hash)];
                        }
                        else {
                            throw "USER DOESN'T EXIST...";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthManager.prototype.changeUserPassword = function (userID, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.one({
                            where: {
                                id: userID
                            },
                            relations: ['auth']
                        })];
                    case 1:
                        user = _b.sent();
                        _a = user.auth;
                        return [4 /*yield*/, this.hashPassword(newPassword, user.auth.salt)];
                    case 2:
                        _a.hash = _b.sent();
                        return [4 /*yield*/, Auth_1.default.save(user.auth)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthManager.prototype.getJWToken = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, tokenPayload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.one({
                            where: {
                                email: email
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        tokenPayload = {
                            user: user.toJson()
                        };
                        return [2 /*return*/, jwt.sign(tokenPayload, this.JWTKEY, {
                                expiresIn: '60d'
                            })];
                }
            });
        });
    };
    AuthManager.prototype.genSalt = function () {
        return bcrypt.genSaltSync(10, 'b');
    };
    AuthManager.prototype.hasValidToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (accept) {
                            jwt.verify(token, _this.JWTKEY, function (err, token) {
                                if (err) {
                                    accept(false);
                                }
                                else {
                                    accept(true);
                                }
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthManager.prototype.parseToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (accept) {
                            jwt.verify(token, _this.JWTKEY, function (err, token) {
                                if (err) {
                                    accept(null);
                                }
                                else {
                                    accept(token);
                                }
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthManager._instance = new AuthManager();
    return AuthManager;
}());
exports.AuthManager = AuthManager;
exports.default = AuthManager.Instance;
//# sourceMappingURL=Auth.js.map