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
var environment_1 = require("../environments/environment");
var Configuration = /** @class */ (function () {
    function Configuration() {
        this._defConfiguration = {
            EXPRESS_HOST: environment_1.environment.EXPRESS_HOST,
            EXPRESS_PORT: environment_1.environment.EXPRESS_PORT,
            SOCKET_HOST: environment_1.environment.SOCKET_HOST,
            SOCKET_PORT: environment_1.environment.SOCKET_PORT,
            SOCKET_TIMEOUT_MILLIS: environment_1.environment.SOCKET_TIMEOUT_MILLIS
        };
    }
    Object.defineProperty(Configuration, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "production", {
        get: function () {
            return environment_1.environment.production;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "ExpressPort", {
        get: function () {
            return this._defConfiguration.EXPRESS_PORT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "ExpressHost", {
        get: function () {
            return this._defConfiguration.EXPRESS_HOST;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "SocketPort", {
        get: function () {
            return this._defConfiguration.SOCKET_PORT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "SocketHost", {
        get: function () {
            return this._defConfiguration.SOCKET_HOST;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "SocketTimeoutMillis", {
        get: function () {
            return this._defConfiguration.SOCKET_TIMEOUT_MILLIS;
        },
        enumerable: true,
        configurable: true
    });
    Configuration.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("_defConfiguration: ", this._defConfiguration);
                return [2 /*return*/];
            });
        });
    };
    Configuration._instance = new Configuration();
    return Configuration;
}());
exports.default = Configuration.Instance;
//# sourceMappingURL=_config.js.map