"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var lovefield_1 = require("lovefield");
var tables_1 = require("../enums/tables");
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager() {
    }
    Object.defineProperty(DatabaseManager.prototype, "builder", {
        get: function () {
            return this._builder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatabaseManager.prototype, "db", {
        get: function () {
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    DatabaseManager.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setUpDatabase()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseManager.prototype.setUpDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._builder = lovefield_1.schema.create('main', 5);
                        this._builder.createTable(tables_1.TABLE_NAME.AUTH)
                            .addColumn(tables_1.TABLE_FIELD_AUTH.id, lovefield_1.Type.NUMBER)
                            .addColumn(tables_1.TABLE_FIELD_AUTH.jwt, lovefield_1.Type.STRING)
                            .addPrimaryKey([tables_1.TABLE_FIELD_AUTH.id]);
                        this._builder.createTable(tables_1.TABLE_NAME.INI_CHECK)
                            .addColumn(tables_1.TABLE_FIELD_CHECK.loaded, lovefield_1.Type.BOOLEAN)
                            .addColumn(tables_1.TABLE_FIELD_AUTH.id, lovefield_1.Type.INTEGER)
                            .addPrimaryKey([tables_1.TABLE_FIELD_AUTH.id]);
                        this._builder.createTable(tables_1.TABLE_NAME.USER)
                            .addColumn(tables_1.TABLE_FIELD_USER.id, lovefield_1.Type.NUMBER)
                            .addColumn(tables_1.TABLE_FIELD_USER.createdAt, lovefield_1.Type.DATE_TIME)
                            .addColumn(tables_1.TABLE_FIELD_USER.updatedAt, lovefield_1.Type.DATE_TIME)
                            .addColumn(tables_1.TABLE_FIELD_USER.firstName, lovefield_1.Type.STRING)
                            .addColumn(tables_1.TABLE_FIELD_USER.lastName, lovefield_1.Type.STRING)
                            .addColumn(tables_1.TABLE_FIELD_USER.username, lovefield_1.Type.STRING)
                            .addColumn(tables_1.TABLE_FIELD_USER.email, lovefield_1.Type.STRING)
                            .addColumn(tables_1.TABLE_FIELD_USER.country, lovefield_1.Type.STRING)
                            .addColumn(tables_1.TABLE_FIELD_USER.photo, lovefield_1.Type.STRING)
                            .addNullable([
                            tables_1.TABLE_FIELD_USER.firstName,
                            tables_1.TABLE_FIELD_USER.lastName,
                            tables_1.TABLE_FIELD_USER.username,
                            tables_1.TABLE_FIELD_USER.country,
                            tables_1.TABLE_FIELD_USER.photo,
                        ])
                            .addPrimaryKey([tables_1.TABLE_FIELD_USER.id]);
                        _a = this;
                        return [4 /*yield*/, this._builder.connect()];
                    case 1:
                        _a._db = _b.sent();
                        return [4 /*yield*/, new Promise(function (accept) { return __awaiter(_this, void 0, void 0, function () {
                                var item, select, rec, e_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            item = this._db.getSchema().table(tables_1.TABLE_NAME.INI_CHECK);
                                            select = this._db.select().from(item).where(item[tables_1.TABLE_FIELD_CHECK.loaded].isNotNull());
                                            return [4 /*yield*/, select.exec()];
                                        case 1:
                                            rec = _a.sent();
                                            accept();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_1 = _a.sent();
                                            accept();
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseManager.Instance = new DatabaseManager();
    return DatabaseManager;
}());
exports.DatabaseManager = DatabaseManager;
exports.default = DatabaseManager.Instance;
//# sourceMappingURL=DatabaseManager.js.map