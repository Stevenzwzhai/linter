"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var loading_1 = __importDefault(require("./util/loading"));
var lintFiles_1 = __importDefault(require("./util/lintFiles"));
var LintJs = /** @class */ (function () {
    function LintJs(args) {
        var _this = this;
        var _ = args._, ignore = args.ignore;
        if (ignore) {
            ignore = Array.isArray(ignore) ? ignore : [ignore];
        }
        lintFiles_1.default(function (args) {
            if (!args || args.length) {
                _this.init(args, ignore);
            }
        });
    }
    LintJs.prototype.init = function (args, ignores) {
        if (args === void 0) { args = []; }
        if (ignores === void 0) { ignores = []; }
        var nodePath = path_1.default.resolve(__dirname, "../node_modules");
        var rootPath = process.cwd();
        var target = args.length
            ? args.map(function (arg) { return path_1.default.resolve(rootPath, arg); })
            : [rootPath];
        var lintIgnores = [];
        ignores.forEach(function (ignore) {
            lintIgnores.push("--ignore-pattern");
            lintIgnores.push(ignore);
        });
        var child = child_process_1.spawn(path_1.default.resolve(nodePath, ".bin/stylelint"), ["--ignore-pattern", "node_modules"].concat(lintIgnores, target), { stdio: "inherit" });
        var loading = new loading_1.default('lintjs', '');
        child.on("close", function (code) {
            if (!code) {
                loading.success("lint complete");
            }
            else {
                loading.fail("code get errors or warnings");
                process.exit(code);
            }
        });
    };
    return LintJs;
}());
exports.default = LintJs;
