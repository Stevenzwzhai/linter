"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = __importDefault(require("ora"));
var Loading = /** @class */ (function () {
    function Loading(name, color) {
        this.spinner = {
            succeed: function (msg) {
                console.log(msg);
            },
            fail: function (msg) {
                console.warn(msg);
            }
        };
        var spinner = ora_1.default("Loading " + name).start();
        spinner.color = color || 'yellow';
        spinner.text = "Loading " + name;
        this.spinner = spinner;
    }
    /**
     * Loading success.
     */
    Loading.prototype.success = function (msg) {
        this.spinner.succeed(msg);
    };
    /**
     * Loading failure.
     */
    Loading.prototype.fail = function (msg) {
        this.spinner.fail(msg);
    };
    return Loading;
}());
exports.default = Loading;
