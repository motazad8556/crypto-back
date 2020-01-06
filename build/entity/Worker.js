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
var tableName_1 = require("../enum/tableName");
var Worker = /** @class */ (function () {
    function Worker() {
    }
    Worker.prototype.toJson = function () {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            task: this.task,
            status: this.status,
            lastResult: this.lastResult
        };
    };
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Worker.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Worker.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Worker.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Worker.prototype, "task", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Worker.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Worker.prototype, "lastResult", void 0);
    Worker = __decorate([
        typeorm_1.Entity({
            name: tableName_1.TABLE_NAME.WORKER
        })
    ], Worker);
    return Worker;
}());
exports.Worker = Worker;
//# sourceMappingURL=Worker.js.map