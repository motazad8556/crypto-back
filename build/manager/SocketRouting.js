"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../_client/enums/routes");
var auth_1 = require("../route_handling/auth");
var user_1 = require("../route_handling/user");
var price_1 = require("../route_handling/price");
var openPosition_1 = require("../route_handling/openPosition");
var OpenOrder_1 = require("../route_handling/OpenOrder");
var positionHistory_1 = require("../route_handling/positionHistory");
var deposit_1 = require("../route_handling/deposit");
var SocketRoutesManager = /** @class */ (function () {
    function SocketRoutesManager() {
    }
    Object.defineProperty(SocketRoutesManager, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description This method watches for incoming calls to the server from the connected socket.
     * @param socketInstance Socket instance that got connected to the server.
     */
    SocketRoutesManager.prototype.listen = function (socketInstance) {
        /** HANDLE AUTH. SIGN-UP */
        socketInstance.on(routes_1.AUTH_ROUTES.SIGN_UP, function (request) {
            auth_1.default.handleUserCreationRequest(socketInstance, request);
        });
        socketInstance.on(routes_1.AUTH_ROUTES.SIGN_IN, function (request) {
            auth_1.default.handleUserAuthRequest(socketInstance, request);
        });
        socketInstance.on(routes_1.AUTH_ROUTES.CHANGE_PASSWORD, function (request) {
            auth_1.default.handleUserChangePasswordRequest(socketInstance, request);
        });
        socketInstance.on(routes_1.AUTH_ROUTES.UPDATE_ACCOUNT, function (request) {
            user_1.default.handleUserAccountUpdate(socketInstance, request);
        });
        socketInstance.on(routes_1.AUTH_ROUTES.FETCH_ACCOUNT, function (request) {
            user_1.default.handleUserAccountFetch(socketInstance, request);
        });
        socketInstance.on(routes_1.PRICE_ROUTES.PRICE_GET_XBT, function (request) {
            price_1.default.handleCurrentPriceRequest(socketInstance, request);
        });
        socketInstance.on(routes_1.OPEN_ORDER_ROUTES.CREATE, function (request) {
            OpenOrder_1.default.handleOpenOrderCreation(socketInstance, request);
        });
        socketInstance.on(routes_1.OPEN_POSITION_ROUTES.FETCH, function (request) {
            openPosition_1.default.handleOpenPositionsFetch(socketInstance, request);
        });
        socketInstance.on(routes_1.OPEN_POSITION_ROUTES.UPDATE, function (request) {
            openPosition_1.default.handleOpenPositionUpdate(socketInstance, request);
        });
        socketInstance.on(routes_1.OPEN_POSITION_ROUTES.CLOSE_AMP, function (request) {
            openPosition_1.default.handleOpenPositionCloseAMP(socketInstance, request);
        });
        socketInstance.on(routes_1.OPEN_ORDER_ROUTES.FETCH, function (request) {
            OpenOrder_1.default.handleOpenOrdersFetch(socketInstance, request);
        });
        socketInstance.on(routes_1.OPEN_ORDER_ROUTES.UPDATE, function (request) {
            OpenOrder_1.default.handleOpenOrderUpdate(socketInstance, request);
        });
        socketInstance.on(routes_1.OPEN_ORDER_ROUTES.CANCEL, function (request) {
            OpenOrder_1.default.handleOpenOrderCancel(socketInstance, request);
        });
        socketInstance.on(routes_1.POSITION_HISTORY_ROUTES.FETCH, function (request) {
            positionHistory_1.default.handlePositionHistoryFetch(socketInstance, request);
        });
        socketInstance.on(routes_1.DEPOSIT_ROUTES.CREATE, function (request) {
            deposit_1.default.handleDepositRequest(socketInstance, request);
        });
    };
    SocketRoutesManager._instance = new SocketRoutesManager();
    return SocketRoutesManager;
}());
exports.SocketRoutesManager = SocketRoutesManager;
exports.default = SocketRoutesManager.Instance;
//# sourceMappingURL=SocketRouting.js.map