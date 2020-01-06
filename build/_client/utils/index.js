"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../enums/order");
var moment = require("moment");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Utils.prototype.assembleResponseMeta = function (_meta, code) {
        return {
            _id: _meta._id,
            _issuedAt: _meta._issuedAt,
            _statusCode: code
        };
    };
    Utils.prototype.assembleResponsePayload = function (meta, payload) {
        return {
            _meta: meta,
            _payload: payload
        };
    };
    /**
     * @description Normalizes the fiat ammounts, to 2 decimal floats.
     * @param ammount The ammount to normalize
     */
    Utils.prototype.normalizeFiatAmmount = function (ammount) {
        return parseFloat(Number(ammount).toFixed(2));
    };
    /**
     * @description Normalizes the crypto ammounts, to 8-decimal floats.
     * @param ammount The ammount to normalize
     */
    Utils.prototype.normalizeBitcoinAmmount = function (ammount) {
        return parseFloat(Number(ammount).toFixed(8));
    };
    /**
     * @description Normalizes the crypto ammounts, to 8-decimal floats.
     * @param ammount The ammount to normalize
     */
    Utils.prototype.normalizeBitcoinMargin = function (ammount) {
        return parseFloat(Number(ammount).toFixed(4));
    };
    /**
     * @description Generats a random ID
     * @param type Type of the ID to be generated. 1: Numerical. 2: String
     * @param length Length of the ID to be produced.
     */
    Utils.prototype.generateRandomID = function (type, length) {
        switch (type) {
            case 1://Numbers
                var numericalId = "";
                while (numericalId.length < length) {
                    numericalId += Math.floor(Math.random() * (1 * 10 ^ length)).toString();
                }
                if (numericalId.length > 0) {
                    numericalId = numericalId.substr(0, length);
                }
                return parseInt(numericalId);
            case 2://Letters
                var stringId = "";
                while (stringId.length < length) {
                    stringId += Math.floor(Math.random() * (1 * 10 ^ length)).toString(16);
                }
                if (stringId.length > 0) {
                    stringId = stringId.substr(0, length);
                }
                return stringId;
        }
    };
    Utils.prototype.calculateLiquidationPrice = function (entryPrice, leverage) {
        return parseFloat(parseFloat((entryPrice - (entryPrice / (leverage ? leverage : 1) / 2)).toString()).toFixed(2));
    };
    /**
     * @description Calculates the profit for the trade when a position moves from a open_position to order_history.
     * @param currentPrice Current bitcoin price
     * @param entryPrice Entry price of the order
     * @param size Size of the order
     * @param bitcoinPrice Bitcoin Price from the order (when the order is moved to position_history)
     * @param leverage Leverage of the order
     */
    Utils.prototype.getProfit = function (currentPrice, entryPrice, size, bitcoinPrice, leverage, opType) {
        if (opType === order_1.ORDER_SIDE.LONG) {
            return parseFloat(parseFloat(Number(((currentPrice - entryPrice) * (size / bitcoinPrice)) / (leverage ? leverage : 1)).toString()).toFixed(4));
        }
        else {
            return parseFloat(parseFloat(Number(((entryPrice - currentPrice) * (size / bitcoinPrice)) / (leverage ? leverage : 1)).toString()).toFixed(4));
        }
    };
    /**
     * @description Gets the ammount to be substracted/added from/to the users's funds.
     * @param size Size of the order, in USD.
     * @param bitcoinPrice Bitcoin price.
     * @param leverage Leverage multiplier.
     */
    Utils.prototype._getSubstractAmmount = function (size, bitcoinPrice, leverage) {
        return (size / bitcoinPrice / (leverage ? leverage : 1));
    };
    Utils.prototype.formatDisplayDate = function (date) {
        return moment(date).format("L LTS");
    };
    Utils._instance = new Utils();
    return Utils;
}());
exports.Utils = Utils;
exports.default = Utils.Instance;
//# sourceMappingURL=index.js.map