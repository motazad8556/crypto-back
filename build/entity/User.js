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
var Auth_1 = require("./Auth");
var OpenPosition_1 = require("./OpenPosition");
var Funds_1 = require("./Funds");
var OpenOrder_1 = require("./OpenOrder");
var tableName_1 = require("../enum/tableName");
var columnNames_1 = require("../enum/columnNames");
var PositionHistory_1 = require("./PositionHistory");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.toJson = function () {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
            country: this.country,
            photo: this.photo,
            funds: this.funds ? this.funds.toJson() : null
        };
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            name: columnNames_1.COLUMN_NAME.USER.id
        }),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({
            name: columnNames_1.COLUMN_NAME.USER.createdAt
        }),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            name: columnNames_1.COLUMN_NAME.USER.updatedAt
        }),
        __metadata("design:type", Date)
    ], User.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
            name: columnNames_1.COLUMN_NAME.USER.firstName
        }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
            name: columnNames_1.COLUMN_NAME.USER.lastName
        }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: false,
            name: columnNames_1.COLUMN_NAME.USER.username
        }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: false,
            name: columnNames_1.COLUMN_NAME.USER.email
        }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
            name: columnNames_1.COLUMN_NAME.USER.country
        }),
        __metadata("design:type", String)
    ], User.prototype, "country", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
            name: columnNames_1.COLUMN_NAME.USER.photo
        }),
        __metadata("design:type", String)
    ], User.prototype, "photo", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Funds_1.Funds; }, function (funds) { return funds.user; }, {
            cascade: true,
        }),
        __metadata("design:type", Funds_1.Funds)
    ], User.prototype, "funds", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Funds_1.Funds; }, function (funds) { return funds.user; }, {
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], User.prototype, "deposits", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return OpenPosition_1.OpenPosition; }, function (order) { return order.user; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], User.prototype, "openPositions", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return OpenOrder_1.OpenOrder; }, function (order) { return order.user; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], User.prototype, "openOrders", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return PositionHistory_1.PositionHistory; }, function (order) { return order.user; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], User.prototype, "PositionHistory", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Auth_1.Auth; }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.USER.auth
        }),
        __metadata("design:type", Auth_1.Auth)
    ], User.prototype, "auth", void 0);
    User = __decorate([
        typeorm_1.Entity({
            name: tableName_1.TABLE_NAME.USER
        })
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map