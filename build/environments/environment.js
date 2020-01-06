"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_prod_1 = require("./environment.prod");
var exchange_envs = true;
var test_environment = {
    production: true,
    EXPRESS_HOST: "https://mighty-forest-81407.herokuapp.com",
    EXPRESS_PORT: 8080,
    SOCKET_HOST: "https://mighty-forest-81407.herokuapp.com",
    SOCKET_PORT: 8080,
    SOCKET_TIMEOUT_MILLIS: 8000
};
exports.environment = exchange_envs ? environment_prod_1.environment : test_environment;
//# sourceMappingURL=environment.js.map