"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TABLE_NAME;
(function (TABLE_NAME) {
    TABLE_NAME["AUTH"] = "auth";
    TABLE_NAME["USER"] = "user";
    TABLE_NAME["INI_CHECK"] = "_check";
})(TABLE_NAME = exports.TABLE_NAME || (exports.TABLE_NAME = {}));
var TABLE_FIELD_AUTH;
(function (TABLE_FIELD_AUTH) {
    TABLE_FIELD_AUTH["id"] = "id";
    TABLE_FIELD_AUTH["jwt"] = "jwt";
})(TABLE_FIELD_AUTH = exports.TABLE_FIELD_AUTH || (exports.TABLE_FIELD_AUTH = {}));
var TABLE_FIELD_CHECK;
(function (TABLE_FIELD_CHECK) {
    TABLE_FIELD_CHECK["loaded"] = "loaded";
})(TABLE_FIELD_CHECK = exports.TABLE_FIELD_CHECK || (exports.TABLE_FIELD_CHECK = {}));
/**
 * @description Fields selectable from the client database
 */
var TABLE_FIELD_USER;
(function (TABLE_FIELD_USER) {
    TABLE_FIELD_USER["id"] = "id";
    TABLE_FIELD_USER["createdAt"] = "createdAt";
    TABLE_FIELD_USER["updatedAt"] = "updatedAt";
    TABLE_FIELD_USER["firstName"] = "firstName";
    TABLE_FIELD_USER["lastName"] = "lastName";
    TABLE_FIELD_USER["username"] = "username";
    TABLE_FIELD_USER["email"] = "email";
    TABLE_FIELD_USER["country"] = "country";
    TABLE_FIELD_USER["photo"] = "photo";
})(TABLE_FIELD_USER = exports.TABLE_FIELD_USER || (exports.TABLE_FIELD_USER = {}));
/**
 * @description Fields selectable from the server record
 */
exports.FIELD_NAMES_USER_RECORD = {
    id: "id",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    firstName: "firstName",
    lastName: "lastName",
    username: "username",
    email: "email",
    country: "country",
    photo: "photo"
};
//# sourceMappingURL=tables.js.map