"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var child_process_1 = require("child_process");
var staged_git_files_1 = __importDefault(require("staged-git-files"));
var pify_1 = __importDefault(require("pify"));
var find_parent_dir_1 = __importDefault(require("find-parent-dir"));
// filter js file
function jsFilesFilter(files) {
    return files.filter(function (filepath) { return /\.js$/.test(filepath); });
}
// get stage files
function getStageFiles(cb) {
    var gitDir = find_parent_dir_1.default.sync(process.cwd(), ".git");
    staged_git_files_1.default.cwd = gitDir;
    var stageFiles = [];
    staged_git_files_1.default("ACM", function (err, files) {
        if (files) {
            stageFiles = files.map(function (item) {
                return item.filename;
            });
        }
        cb(err, stageFiles);
    });
}
// get commit times
function getCommitTimes(cb) {
    child_process_1.exec("git rev-list --all --count", function (err, stdout, stderr) {
        if (err) {
            console.log("err:", err);
        }
        else {
        }
        cb(err, Number(stdout));
    });
}
// get last commit files
function getCommitDiffFiles(cb) {
    var result = [];
    var command = "git diff --name-status HEAD~ HEAD";
    var getArrList = function (str, type) {
        var arr = str.split("\n");
        return arr.filter(function (item) {
            var regex = new RegExp("[" + type + "].*");
            if (regex.test(item)) {
                return item !== undefined;
            }
        });
    };
    var formatList = function (arr, type) {
        return arr.map(function (item) {
            return item.replace(/\s/g, "").replace(type, "");
        });
    };
    child_process_1.exec(command, function (err, stdout, stderr) {
        if (err) {
            console.log("err:", err);
            console.log("stderr:", stderr);
        }
        else {
            var typeList = ["A", "C", "M"];
            var arr_1;
            typeList.forEach(function (type) {
                arr_1 = getArrList(stdout, type);
                arr_1 = formatList(arr_1, type);
                if (arr_1.length > 0) {
                    result = result.concat(arr_1);
                }
            });
        }
        cb(err, result);
    });
}
function lintNeedCheckFiles(checkFiles) {
    if (typeof checkFiles !== "function")
        return;
    pify_1.default(getStageFiles)().then(function (files) {
        if (files && files.length) {
            checkFiles(jsFilesFilter(files));
        }
        else {
            pify_1.default(getCommitTimes)().then(function (commitNum) {
                if (commitNum > 1) {
                    pify_1.default(getCommitDiffFiles)().then(function (files) {
                        if (files.length) {
                            checkFiles(jsFilesFilter(files));
                        }
                        else {
                            checkFiles();
                        }
                    });
                }
                else {
                    //lint all
                    checkFiles();
                }
            });
        }
    });
}
var Linter = /** @class */ (function () {
    function Linter(ctx) {
        this.ctx = {
            loading: {
                success: function (val) {
                    console.log(val);
                },
                fail: function (val) {
                    console.log(val);
                }
            }
        };
        this.ctx = ctx;
    }
    Linter.prototype.init = function (args, ignores) {
        if (args === void 0) { args = []; }
        if (ignores === void 0) { ignores = []; }
        var nodePath = path_1.default.resolve(__dirname, "../../node_modules");
        var rootPath = process.cwd();
        var target = args.length
            ? args.map(function (arg) { return path_1.default.resolve(rootPath, arg); })
            : [rootPath];
        var lintIgnores = [];
        ignores.forEach(function (ignore) {
            lintIgnores.push("--ignore-pattern");
            lintIgnores.push(ignore);
        });
        var child = cross_spawn_1.default(path_1.default.resolve(nodePath, ".bin/eslint"), ["--ignore-pattern", "node_modules"].concat(lintIgnores, target), { stdio: "inherit" });
        var loading = this.ctx.loading;
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
    return Linter;
}());
module.exports = function (ctx) {
    var linter = new Linter(ctx);
    var _a = ctx.args, _ = _a._, ignore = _a.ignore;
    if (ignore) {
        ignore = Array.isArray(ignore) ? ignore : [ignore];
    }
    return lintNeedCheckFiles(function (args) {
        if (!args || args.length) {
            linter.init(args, ignore);
        }
    });
};
