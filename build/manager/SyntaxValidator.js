"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Country_1 = require("../_client/enums/Country");
var SyntaxValidator = /** @class */ (function () {
    function SyntaxValidator() {
    }
    Object.defineProperty(SyntaxValidator, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SyntaxValidator.prototype.hasValidEmail = function (email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(email);
    };
    SyntaxValidator.prototype.hasValidPassword = function (pass) {
        return pass && pass.length < 60;
    };
    SyntaxValidator.prototype.hasValidFirstName = function (name) {
        return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,20}$/.test(name);
    };
    SyntaxValidator.prototype.hasValidLastName = function (name) {
        return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,20}$/.test(name);
    };
    SyntaxValidator.prototype.hasValidBase64Image = function (image) {
        if (!image) {
            return true;
        }
        //return /^[\s\S]{1,1024*}$/.test(image);
        return (image.length < (1024 * 1024) + (.20 * (1024 * 1024)));
    };
    SyntaxValidator.prototype.hasValidCountry = function (country) {
        return country &&
            /^[a-zA-Z]{3}$/.test(country) &&
            Country_1.USED_COUNTRIES.find(function (el) {
                return el.code === country;
            }) !== null;
    };
    SyntaxValidator._instance = new SyntaxValidator();
    return SyntaxValidator;
}());
exports.SyntaxValidator = SyntaxValidator;
exports.default = SyntaxValidator.Instance;
//# sourceMappingURL=SyntaxValidator.js.map