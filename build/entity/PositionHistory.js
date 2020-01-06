"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var order_1 = require("../_client/enums/order");
var Price_1 = require("./Price");
var columnNames_1 = require("../enum/columnNames");
var tableName_1 = require("../enum/tableName");
var PositionHistory = /** @class */ (function () {
    function PositionHistory() {
    }
    /**
     * @description Gets a 10-letters (+ digits) ID
     */
    PositionHistory.prototype.getNewId = function () {
        var newID = "";
        while (newID.length < 10) {
            newID += (Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
        }
        if (newID.length > 10) {
            newID = newID.substr(0, 10);
        }
        return newID;
    };
    PositionHistory.prototype.toJson = function () {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            user: this.user ? this.user.id : null,
            dateTime: this.dateTime,
            pair: this.pair,
            size: this.size,
            side: this.side,
            exit_price: this.exit_price,
            entry_price: this.entry_price,
            liquidation_price: this.liquidation_price,
            stop_price: this.stop_price,
            profit: this.profit,
            leverage: this.leverage,
            margin: this.margin,
        };
    };
    __decorate([
        typeorm_1.PrimaryColumn({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.id
        }),
        __metadata("design:type", String)
    ], PositionHistory.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.createdAt
        }),
        __metadata("design:type", Date)
    ], PositionHistory.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.status,
            default: order_1.OPEN_POSITION_STATUS.ACTIVE
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "status", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.updatedAt
        }),
        __metadata("design:type", Date)
    ], PositionHistory.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.dateTime
        }),
        __metadata("design:type", Date)
    ], PositionHistory.prototype, "dateTime", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.PositionHistory; }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.user
        }),
        __metadata("design:type", User_1.User)
    ], PositionHistory.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.pair
        }),
        __metadata("design:type", String)
    ], PositionHistory.prototype, "pair", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.size
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "size", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.side
        }),
        __metadata("design:type", String)
    ], PositionHistory.prototype, "side", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.margin
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "margin", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.entry_price
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "entry_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.liquidation_price
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "liquidation_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.exit_price
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "exit_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.stop_price
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "stop_price", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.leverage
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "leverage", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.profit
        }),
        __metadata("design:type", Number)
    ], PositionHistory.prototype, "profit", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Price_1.Price; }, function (price) { return price; }, {
            cascade: true
        }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.POSITION_HISTORY.price_copy
        }),
        __metadata("design:type", Price_1.Price)
    ], PositionHistory.prototype, "price_copy", void 0);
    PositionHistory = __decorate([
        typeorm_1.Entity({
            name: tableName_1.TABLE_NAME.POSITION_HISTORY
        })
    ], PositionHistory);
    return PositionHistory;
}());
exports.PositionHistory = PositionHistory;
//# sourceMappingURL=PositionHistory.js.map