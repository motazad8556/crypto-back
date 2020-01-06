"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./controller/User");
exports.Routes = [{
        method: "get",
        route: "/users",
        controller: User_1.UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: User_1.UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: User_1.UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: User_1.UserController,
        action: "remove"
    }];
//# sourceMappingURL=routes.js.map