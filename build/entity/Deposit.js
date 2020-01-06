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
var tableName_1 = require("../enum/tableName");
var columnNames_1 = require("../enum/columnNames");
var Deposit = /** @class */ (function () {
    function Deposit() {
    }
    Deposit.prototype.toJson = function () {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            user: this.user ? this.user.id : null,
            btc_ammount: this.btc_ammount,
            btc_adddress: this.btc_adddress
        };
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            name: columnNames_1.COLUMN_NAME.DEPOSIT.id
        }),
        __metadata("design:type", Number)
    ], Deposit.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({
            name: columnNames_1.COLUMN_NAME.DEPOSIT.createdAt
        }),
        __metadata("design:type", Date)
    ], Deposit.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            name: columnNames_1.COLUMN_NAME.DEPOSIT.updatedAt
        }),
        __metadata("design:type", Date)
    ], Deposit.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.funds; }),
        typeorm_1.JoinColumn({
            name: columnNames_1.COLUMN_NAME.DEPOSIT.user
        }),
        __metadata("design:type", User_1.User)
    ], Deposit.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float",
            name: columnNames_1.COLUMN_NAME.DEPOSIT.btc_ammount
        }),
        __metadata("design:type", Number)
    ], Deposit.prototype, "btc_ammount", void 0);
    __decorate([
        typeorm_1.Column({
            name: columnNames_1.COLUMN_NAME.DEPOSIT.btc_address
        }),
        __metadata("design:type", String)
    ], Deposit.prototype, "btc_adddress", void 0);
    Deposit = __decorate([
        typeorm_1.Entity({
            name: tableName_1.TABLE_NAME.DEPOSIT
        })
    ], Deposit);
    return Deposit;
}());
exports.Deposit = Deposit;
//# sourceMappingURL=Deposit.js.map