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
var OpenPosition_1 = require("./OpenPosition");
var OpenOrder_1 = require("./OpenOrder");
var symbols_1 = require("../_client/enums/symbols");
var tableName_1 = require("../enum/tableName");
var PositionHistory_1 = require("./PositionHistory");
var Price = /** @class */ (function () {
    function Price() {
    }
    Price_1 = Price;
    Price.prototype.fromJson = function (data) {
        var _price = new Price_1();
        _price.id = data.id;
        _price.createdAt = data.createdAt;
        _price.updatedAt = data.updatedAt;
        _price.symbol = data.symbol;
        _price.timestamp = data.timestamp;
        _price.price = data.price;
        _price._tradeCopy = data._tradeCopy;
        return _price;
    };
    Price.prototype.toJson = function () {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            symbol: this.symbol,
            timestamp: this.timestamp,
            price: this.price,
            _tradeCopy: this._tradeCopy
        };
    };
    Price.prototype.getNewId = function () {
        var newID = "";
        while (newID.length < 10) {
            newID += Math.floor((Math.random() * Number.MAX_SAFE_INTEGER));
        }
        if (newID.length > 10) {
            newID = newID.substr(0, 9);
        }
        return parseInt(newID);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Price.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Price.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Price.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Price.prototype, "symbol", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Price.prototype, "timestamp", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float"
        }),
        __metadata("design:type", Number)
    ], Price.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Price.prototype, "_tradeCopy", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return OpenPosition_1.OpenPosition; }, function (position) { return position.price_copy; }, {
            nullable: true
        }),
        __metadata("design:type", OpenPosition_1.OpenPosition)
    ], Price.prototype, "openPosition", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return OpenOrder_1.OpenOrder; }, function (position) { return position.price_copy; }, {
            nullable: true
        }),
        __metadata("design:type", OpenPosition_1.OpenPosition)
    ], Price.prototype, "openOrder", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return OpenOrder_1.OpenOrder; }, function (position) { return position.price_copy; }, {
            nullable: true
        }),
        __metadata("design:type", PositionHistory_1.PositionHistory)
    ], Price.prototype, "positionHistory", void 0);
    Price = Price_1 = __decorate([
        typeorm_1.Entity({
            name: tableName_1.TABLE_NAME.PRICE
        })
    ], Price);
    return Price;
    var Price_1;
}());
exports.Price = Price;
//# sourceMappingURL=Price.js.map