"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Worker_1 = require("./Worker");
var ShutdownManager = /** @class */ (function () {
    function ShutdownManager() {
    }
    /**
     * @description Handles the shutdown and process termination events
     */
    ShutdownManager.prototype.init = function () {
        process.on('SIGTERM', function () {
            Worker_1.default.stopWorker()
                .then(function () {
                console.log("Stopped worker SIGTERM...");
                process.exit();
            })
                .catch(function (err) {
                console.log("Error found...", err);
                process.exit();
            });
        });
        process.on('SIGINT', function () {
            Worker_1.default.stopWorker()
                .then(function () {
                console.log("Stopped worker SIGINT...");
                process.exit();
            })
                .catch(function (err) {
                console.log("Error found...", err);
                process.exit();
            });
        });
    };
    ShutdownManager.Instance = new ShutdownManager();
    return ShutdownManager;
}());
exports.ShutdownManager = ShutdownManager;
exports.default = ShutdownManager.Instance;
//# sourceMappingURL=Shutdown.js.map