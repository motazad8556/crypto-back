"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _init_1 = require("./_init");
_init_1.default.init()
    .then(function () {
    console.log("Server initialized correctly...");
})
    .catch(function (err) {
    console.log("\n\n\nThere has been an error initializing the server...\n\n\n");
    console.log(err);
});
//# sourceMappingURL=index.js.map