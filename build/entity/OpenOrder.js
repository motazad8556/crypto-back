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
var symbols_1 = require("../_client/enums/symbols");
var columnNames_1 = require("../enum/columnNames");
var OpenPosition_1 = require("./OpenPosition");
var tableName_1 = require("../enum/tableName");
var OpenOrder = /** @class */ (function () {
    function OpenOrder() {
    }
    /**
     * @description Gets a 10-letters (+ digits) ID for this order
     */
    OpenOrder.prototype.getNewId = function () {
        var newID = "";
        while (newID.length < 10) {
            newID += (Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
        }
        if (newID.length > 10) {
            newID = newID.substr(0, 10);
        }
        return newID;
    };
    OpenOrder.prototype.toJson = function () {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            status: this.status,
            user: this.user ? this.user.id : null,
            openPosition: this.openPosition ? this.openPosition.toJson() : null,
            dateTime: this.dateTime,
            order_type: this.order_type,
            pair: this.pair,
            size: this.size,
            leverage: this.leverage,
            margin: this.margin,
            side: this.side,
            entry_price: this.entry_price,
            limit_price: this.limit_price,
            exit_price: this.exit_price,
            stop_price: this.stop_price,
            price_copy: this.price_copy ? this.price_copy.toJson() : null
        };
    };
    __decorate([
        typeorm_1.PrimaryColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.id
        }),
        __metadata("design:type", String)
    ], OpenOrder.prototype, "id", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.updatedAt
        }),
        __metadata("design:type", Date)
    ], OpenOrder.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.created_at
        }),
        __metadata("design:type", Date)
    ], OpenOrder.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.status,
            default: order_1.OPEN_ORDER_STATUS.ACTIVE
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "status", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.openOrders; }, {
            nullable: true
        }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.user
        }),
        __metadata("design:type", User_1.User)
    ], OpenOrder.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return OpenPosition_1.OpenPosition; }, function (position) { return position.order; }),
        __metadata("design:type", OpenPosition_1.OpenPosition)
    ], OpenOrder.prototype, "openPosition", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Price_1.Price; }, function (price) { return price.openOrder; }, {
            nullable: true,
            cascade: true
        }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.price_copy
        }),
        __metadata("design:type", Price_1.Price)
    ], OpenOrder.prototype, "price_copy", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.dateTime
        }),
        __metadata("design:type", Date)
    ], OpenOrder.prototype, "dateTime", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.order_type
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "order_type", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.pair
        }),
        __metadata("design:type", String)
    ], OpenOrder.prototype, "pair", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.size
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "size", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.leverage
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "leverage", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.margin
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "margin", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.side
        }),
        __metadata("design:type", String)
    ], OpenOrder.prototype, "side", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.entry_price
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "entry_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.limit_price
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "limit_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.exit_price
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "exit_price", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.OPEN_ORDER.stop_price
        }),
        __metadata("design:type", Number)
    ], OpenOrder.prototype, "stop_price", void 0);
    OpenOrder = __decorate([
        typeorm_1.Entity({
            name: tableName_1.TABLE_NAME.OPEN_ORDER
        })
    ], OpenOrder);
    return OpenOrder;
}());
exports.OpenOrder = OpenOrder;
//# sourceMappingURL=OpenOrder.js.map