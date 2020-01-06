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
var _config_1 = require("../_config");
var Worker_1 = require("../controller/Worker");
var worker_1 = require("../enum/worker");
var Request = require("request");
var Price_1 = require("../controller/Price");
var Price_2 = require("../entity/Price");
var Worker_2 = require("./Worker");
var ConnectionManager_1 = require("./ConnectionManager");
var routes_1 = require("../_client/enums/routes");
var symbols_1 = require("../_client/enums/symbols");
var OpenOrder_1 = require("../controller/OpenOrder");
var OpenPosition_1 = require("../controller/OpenPosition");
var LatestPriceManager = /** @class */ (function () {
    function LatestPriceManager() {
    }
    LatestPriceManager.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.startWatching(symbols_1.SYMBOL.XBT);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description Starts requesting and updating the price every 5s
     */
    LatestPriceManager.prototype.startWatching = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var currentWorker, diff, i, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Worker_1.default.one({
                            where: {
                                status: worker_1.WORKER_STATUS.WORKING,
                                task: worker_1.WORKER_TASK.FETCH_LATEST_PRICE
                            },
                            order: {
                                updatedAt: 'DESC'
                            }
                        })];
                    case 1:
                        currentWorker = _a.sent();
                        if (!currentWorker) return [3 /*break*/, 14];
                        diff = new Date().getTime() - currentWorker.updatedAt.getTime();
                        if (!(diff > (_config_1.default.PriceUpdateTime + 3000))) return [3 /*break*/, 13];
                        if (!(currentWorker.id !== _config_1.default.workerId)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Worker_2.default.startWorker(worker_1.WORKER_TASK.FETCH_LATEST_PRICE)];
                    case 2:
                        _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!true) return [3 /*break*/, 6];
                        return [4 /*yield*/, new Promise(function (accept) {
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this._updatePrice(symbol)];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, Worker_2.default.updateWorker()];
                                            case 2:
                                                _a.sent();
                                                accept();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, _config_1.default.PriceUpdateTime);
                            })
                                .catch(function (err) {
                                //console.log(err);
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7: 
                    //console.log("\n\n\n"+__filename+": startWatching -- 6\n\n\n");
                    //Fetch price, update and
                    //start listening
                    return [4 /*yield*/, Worker_2.default.startWorker(worker_1.WORKER_TASK.FETCH_LATEST_PRICE)];
                    case 8:
                        //console.log("\n\n\n"+__filename+": startWatching -- 6\n\n\n");
                        //Fetch price, update and
                        //start listening
                        _a.sent();
                        return [4 /*yield*/, this._updatePrice(symbol)];
                    case 9:
                        _a.sent();
                        i = 0;
                        _a.label = 10;
                    case 10:
                        if (!true) return [3 /*break*/, 13];
                        return [4 /*yield*/, new Promise(function (accept) {
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this._updatePrice(symbol)];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, Worker_2.default.updateWorker()];
                                            case 2:
                                                _a.sent();
                                                accept();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, _config_1.default.PriceUpdateTime);
                            })
                                .catch(function (err) {
                                console.log(err);
                            })];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        i++;
                        return [3 /*break*/, 10];
                    case 13: return [3 /*break*/, 20];
                    case 14: 
                    //console.log("\n\n\n"+__filename+": startWatching -- 7\n\n\n");
                    //No current worker to undertake this task
                    //We proceed to take it on our own
                    return [4 /*yield*/, Worker_2.default.startWorker(worker_1.WORKER_TASK.FETCH_LATEST_PRICE)];
                    case 15:
                        //console.log("\n\n\n"+__filename+": startWatching -- 7\n\n\n");
                        //No current worker to undertake this task
                        //We proceed to take it on our own
                        _a.sent();
                        return [4 /*yield*/, this._updatePrice(symbol)];
                    case 16:
                        _a.sent();
                        i = 0;
                        _a.label = 17;
                    case 17:
                        if (!true) return [3 /*break*/, 20];
                        return [4 /*yield*/, new Promise(function (accept) {
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this._updatePrice(symbol)];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, Worker_2.default.updateWorker()];
                                            case 2:
                                                _a.sent();
                                                accept();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, _config_1.default.PriceUpdateTime);
                            })
                                .catch(function (err) {
                                console.log(err);
                            })];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19:
                        i++;
                        return [3 /*break*/, 17];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Requests and Updates the Bitcoin Price
     * @param symbol The symbol to watch
     */
    LatestPriceManager.prototype._updatePrice = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var body, currentPrice, _oldRecord, obsoletePrices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (accept) {
                            Request
                                .get("https://www.bitmex.com/api/v1/trade?symbol=" + symbols_1.SYMBOL_EQ[symbol] + "&count=1&reverse=true", function (error, response, body) {
                                if (error) {
                                    accept(null);
                                }
                                else {
                                    try {
                                        accept(JSON.parse(body)[0]);
                                    }
                                    catch (e) {
                                        accept(null);
                                    }
                                }
                            });
                        })];
                    case 1:
                        body = _a.sent();
                        if (!body) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Price_1.default.one({
                                where: {
                                    _tradeCopy: false,
                                    symbol: body.symbol
                                }
                            })];
                    case 2:
                        currentPrice = _a.sent();
                        if (!!currentPrice) return [3 /*break*/, 3];
                        //Create it
                        currentPrice = new Price_2.Price();
                        currentPrice._tradeCopy = false;
                        currentPrice.symbol = body.symbol;
                        return [3 /*break*/, 6];
                    case 3:
                        _oldRecord = currentPrice.fromJson(currentPrice.toJson());
                        _oldRecord.id = null;
                        return [4 /*yield*/, Price_1.default.save(_oldRecord)];
                    case 4:
                        _oldRecord = _a.sent();
                        return [4 /*yield*/, Price_1.default.removeObsoletePrices(_oldRecord.timestamp)];
                    case 5:
                        obsoletePrices = _a.sent();
                        console.log("obsoletePrices -- reference: ", _oldRecord);
                        console.log("obsoletePrices: ", obsoletePrices);
                        _a.label = 6;
                    case 6:
                        currentPrice.price = body.price;
                        currentPrice.price = 1234; //TODO Delete this line
                        currentPrice.timestamp = new Date(body.timestamp);
                        return [4 /*yield*/, Price_1.default.save(currentPrice)];
                    case 7:
                        currentPrice = _a.sent(); //Saving Updated Copy
                        //Emmit Price via broadcast
                        if (symbol === symbols_1.SYMBOL.XBT) {
                            ConnectionManager_1.default.emitBroadcast(routes_1.PRICE_ROUTES.PRICE_UPDATE_XBT, currentPrice.toJson());
                            OpenOrder_1.default.upgradeMetOpenOrders(currentPrice)
                                .then(function () {
                                console.log("Upgraded Met Open Orders...");
                            })
                                .catch(function (e) {
                                console.log("\n\n\n\n\n**************** ERROR UPGRADING UPDATE ORDERS:\n\n", e);
                            });
                            OpenPosition_1.default.closeMetOpenPositions(currentPrice)
                                .then(function () {
                                console.log("Upgraded Met Open Positions...");
                            })
                                .catch(function (e) {
                                console.log("\n\n\n\n\n\n**************** ERROR UPGRADING UPDATE POSITIONS:\n\n", e);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LatestPriceManager.Instance = new LatestPriceManager();
    return LatestPriceManager;
}());
exports.LatestPriceManager = LatestPriceManager;
exports.default = LatestPriceManager.Instance;
//# sourceMappingURL=LatestPrice.js.map