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
var Funds = /** @class */ (function () {
    function Funds() {
    }
    Funds.prototype.toJson = function () {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            user: this.user ? this.user.id : null,
            btc_ammount: this.btc_ammount
        };
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Funds.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Funds.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Funds.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.User; }, function (user) { return user.funds; }),
        typeorm_1.JoinColumn({
            name: 'user_id'
        }),
        __metadata("design:type", User_1.User)
    ], Funds.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({
            type: "float"
        }),
        __metadata("design:type", Number)
    ], Funds.prototype, "btc_ammount", void 0);
    Funds = __decorate([
        typeorm_1.Entity({
            name: tableName_1.TABLE_NAME.FUNDS
        })
    ], Funds);
    return Funds;
}());
exports.Funds = Funds;
//# sourceMappingURL=Funds.js.map