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
var OpenOrder_1 = require("./OpenOrder");
var tableName_1 = require("../enum/tableName");
var OpenPosition = /** @class */ (function () {
    function OpenPosition() {
    }
    /**
     * @description Gets a 10-letters (+ digits) ID for this order
     */
    OpenPosition.prototype.getNewId = function () {
        var newID = "";
        while (newID.length < 10) {
            newID += (Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
        }
        if (newID.length > 10) {
            newID = newID.substr(0, 10);
        }
        return newID;
    };
    OpenPosition.prototype.toJson = function () {
        return {
            id: this.id,
            margin: this.margin,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            user: this.user ? this.user.id : null,
            order: this.order ? this.order.id : null,
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
            price_copy: this.price_copy ? this.price_copy.toJson() : null,
        };
    };
    __decorate([
        typeorm_1.PrimaryColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.id
        }),
        __metadata("design:type", String)
    ], OpenPosition.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.createdAt
        }),
        __metadata("design:type", Date)
    ], OpenPosition.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.status,
            default: order_1.OPEN_POSITION_STATUS.ACTIVE
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "status", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.updatedAt
        }),
        __metadata("design:type", Date)
    ], OpenPosition.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.dateTime
        }),
        __metadata("design:type", Date)
    ], OpenPosition.prototype, "dateTime", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.openPositions; }, {
            nullable: true
        }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.user
        }),
        __metadata("design:type", User_1.User)
    ], OpenPosition.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return OpenOrder_1.OpenOrder; }, function (order) { return order.openPosition; }, {
            nullable: true
        }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.order
        }),
        __metadata("design:type", OpenOrder_1.OpenOrder)
    ], OpenPosition.prototype, "order", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.pair
        }),
        __metadata("design:type", String)
    ], OpenPosition.prototype, "pair", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.size
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "size", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.side
        }),
        __metadata("design:type", String)
    ], OpenPosition.prototype, "side", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.entry_price
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "entry_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.liquidation_price
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "liquidation_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.exit_price
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "exit_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.stop_price
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "stop_price", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.leverage
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "leverage", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.margin
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "margin", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.profit,
            default: null,
            nullable: true
        }),
        __metadata("design:type", Number)
    ], OpenPosition.prototype, "profit", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Price_1.Price; }, function (price) { return price.openPosition; }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_POSITION.price_copy
        }),
        __metadata("design:type", Price_1.Price)
    ], OpenPosition.prototype, "price_copy", void 0);
    OpenPosition = __decorate([
        typeorm_1.Entity({
            name: tableName_1.TABLE_NAME.OPEN_POSITION
        })
    ], OpenPosition);
    return OpenPosition;
}());
exports.OpenPosition = OpenPosition;
//# sourceMappingURL=OpenPosition.js.map