"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var staged_git_files_1 = __importDefault(require("staged-git-files"));
var find_parent_dir_1 = __importDefault(require("find-parent-dir"));
var child_process_1 = require("child_process");
// filter js file
function jsFilesFilter(files) {
    return files.filter(function (filepath) { return /\.js$/.test(filepath); });
}
exports.jsFilesFilter = jsFilesFilter;
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
exports.getStageFiles = getStageFiles;
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
exports.getCommitTimes = getCommitTimes;
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
exports.getCommitDiffFiles = getCommitDiffFiles;
