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
var dotenv = require("dotenv");
var Auth_1 = require("./entity/Auth");
var Price_1 = require("./entity/Price");
var User_1 = require("./entity/User");
var Worker_1 = require("./entity/Worker");
var OpenPosition_1 = require("./entity/OpenPosition");
var Funds_1 = require("./entity/Funds");
var OpenOrder_1 = require("./entity/OpenOrder");
var PositionHistory_1 = require("./entity/PositionHistory");
var Deposit_1 = require("./entity/Deposit");
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Object.defineProperty(Configuration, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "ExpressPort", {
        get: function () {
            return process.env.EXPRESS_PORT ?
                parseInt(process.env.EXPRESS_PORT) :
                this._defConfiguration.EXPRESS_PORT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "SocketPort", {
        get: function () {
            return process.env.SOCKET_PORT ?
                parseInt(process.env.SOCKET_PORT) :
                this._defConfiguration.SOCKET_PORT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "workerId", {
        get: function () {
            return process.env.WORKER_ID ? process.env.WORKER_ID : (function () {
                global['workerID'] = global['workerID'] ? global['workerID'] : Math.floor(Math.random() * 1e10).toString(16);
                return global['workerID'];
            })();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "PriceUpdateTime", {
        get: function () {
            return process.env.PRICE_UPDATE_TIME ?
                parseInt(process.env.PRICE_UPDATE_TIME) :
                this._defConfiguration.PRICE_UPDATE_TIME;
        },
        enumerable: true,
        configurable: true
    });
    Configuration.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //!!process.env.PROD ? dotenv.config() : null;
                !!process.env.PROD ? null : dotenv.config();
                this._defConfiguration = {
                    EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT) || 3000,
                    SOCKET_PORT: parseInt(process.env.SOCKET_PORT),
                    PRICE_UPDATE_TIME: parseInt(process.env.PRICE_UPDATE_TIME),
                    WORKER_ID: process.env.WORKER_ID
                };
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(Configuration.prototype, "isProduction", {
        get: function () {
            return process.env.PROD && process.env.PROD.toLowerCase() === "true";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "databaseConfig", {
        get: function () {
            var entities = [
                Auth_1.Auth, Price_1.Price, User_1.User, Worker_1.Worker, OpenPosition_1.OpenPosition, Funds_1.Funds, OpenOrder_1.OpenOrder, PositionHistory_1.PositionHistory, Deposit_1.Deposit
            ];
            var config = this.isProduction ? {
                "name": "production",
                "type": process.env.DATABASE_TYPE,
                "host": process.env.DATABASE_HOST,
                "port": parseInt(process.env.DATABASE_PORT),
                "username": process.env.DATABASE_USERNAME,
                "password": process.env.DATABASE_PASSWORD,
                "database": process.env.DATABASE_NAME,
                "synchronize": true,
                "dropSchema": true,
                "entities": entities,
                "logging": true,
                "migrations": [
                    "src/migration/**/*.js"
                ],
                "subscribers": [
                    "src/subscriber/**/*.js"
                ],
                "cli": {
                    "entitiesDir": "src/entity",
                    "migrationsDir": "src/migration",
                    "subscribersDir": "src/subscriber"
                }
            } :
                {
                    "name": "test",
                    "type": "sqlite",
                    "database": "database.sqlite",
                    "dropSchema": true,
                    "synchronize": true,
                    "logging": false,
                    "entities": entities,
                    "migrations": [
                        "src/migration/**/*.ts"
                    ],
                    "subscribers": [
                        "src/subscriber/**/*.ts"
                    ],
                    "cli": {
                        "entitiesDir": "src/entity",
                        "migrationsDir": "src/migration",
                        "subscribersDir": "src/subscriber"
                    }
                };
            console.log("Config loaded: ", config.name);
            return config;
        },
        enumerable: true,
        configurable: true
    });
    Configuration._instance = new Configuration();
    return Configuration;
}());
exports.Configuration = Configuration;
exports.default = Configuration.Instance;
//# sourceMappingURL=_config.js.map