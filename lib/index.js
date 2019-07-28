"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var minimist_1 = __importDefault(require("minimist"));
var lintJs_1 = __importDefault(require("./lintJs"));
var lintTs_1 = __importDefault(require("./lintTs"));
var lintStyle_1 = __importDefault(require("./lintStyle"));
var args = minimist_1.default(process.argv.slice(2)) || {};
function linter() {
    var lintType = '';
    if (args._) {
        lintType = args._[0];
        args._.unshift();
    }
    var lintAll = function () {
        new lintJs_1.default(args);
        new lintTs_1.default(args);
        new lintStyle_1.default(args);
    };
    switch (lintType) {
        case 'js':
            new lintJs_1.default(args);
            break;
        case 'ts':
            new lintTs_1.default(args);
            break;
        case 'style':
            new lintStyle_1.default(args);
            break;
        default:
    }
}
exports.default = linter;
module.exports = exports.defualt;
