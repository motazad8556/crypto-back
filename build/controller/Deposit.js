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
var Funds_1 = require("../entity/Funds");
var Deposit_1 = require("../entity/Deposit");
var routes_1 = require("../_client/enums/routes");
var codes_1 = require("../_client/enums/codes");
var ConnectionManager_1 = require("../manager/ConnectionManager");
var utils_1 = require("../_client/utils");
var DepositController = /** @class */ (function () {
    function DepositController() {
    }
    Object.defineProperty(DepositController, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositController.prototype, "depositRepository", {
        get: function () {
            this._depositRepository = (this._depositRepository) ? this._depositRepository : DatabaseManager_1.default.databaseConnection.getRepository(Deposit_1.Deposit);
            return this._depositRepository;
        },
        enumerable: true,
        configurable: true
    });
    DepositController.prototype.all = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositRepository.find(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DepositController.prototype.one = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositRepository.findOne(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DepositController.prototype.save = function (deposit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositRepository.save(deposit)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, deposit];
                }
            });
        });
    };
    DepositController.prototype.update = function (deposit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositRepository.save(deposit)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DepositController.prototype.remove = function (deposit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.depositRepository.remove(deposit)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Adds a new deposit for the user's account and update it's funds balance
     * @param user User record with the funds relationship loaded
     * @param ammountBTC Ammount of BTC to add to the user's funds
     */
    DepositController.prototype.makeDeposit = function (user, ammountBTC, address) {
        return __awaiter(this, void 0, void 0, function () {
            var deposit, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        user.funds.btc_ammount = utils_1.default.normalizeBitcoinAmmount(user.funds.btc_ammount + ammountBTC);
                        deposit = new Deposit_1.Deposit();
                        deposit.btc_ammount = ammountBTC;
                        deposit.user = user;
                        deposit.btc_adddress = address;
                        _a = user;
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(Funds_1.Funds).save(user.funds)];
                    case 1:
                        _a.funds = _b.sent();
                        return [4 /*yield*/, DatabaseManager_1.default.databaseConnection.getRepository(Deposit_1.Deposit).save(deposit)];
                    case 2:
                        deposit = _b.sent();
                        ConnectionManager_1.default.emitBroadcast(routes_1.FUND_ROUTES.LISTEN_UPDATED.replace(codes_1.UID_REPLACEMENT, user.id.toString()), user.funds.toJson());
                        ConnectionManager_1.default.emitBroadcast(routes_1.DEPOSIT_ROUTES.LISTEN_NEW.replace(codes_1.UID_REPLACEMENT, user.id.toString()), deposit.toJson());
                        return [2 /*return*/, { deposit: deposit, newFunds: user.funds }];
                    case 3:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DepositController._instance = new DepositController();
    return DepositController;
}());
exports.DepositController = DepositController;
exports.default = DepositController.Instance;
//# sourceMappingURL=Deposit.js.map