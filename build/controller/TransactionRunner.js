"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseManager_1 = require("../manager/DatabaseManager");
var TransactionRunner = /** @class */ (function () {
    function TransactionRunner() {
    }
    Object.defineProperty(TransactionRunner, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    TransactionRunner.prototype.runTransaction = function (callback) {
        return DatabaseManager_1.default.databaseConnection.transaction(callback);
    };
    TransactionRunner._instance = new TransactionRunner();
    return TransactionRunner;
}());
exports.default = TransactionRunner.Instance;
//# sourceMappingURL=TransactionRunner.js.map