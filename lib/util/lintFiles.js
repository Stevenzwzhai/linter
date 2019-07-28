"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var findFiles_1 = require("./findFiles");
var pify_1 = __importDefault(require("pify"));
function lintFile(checkFn) {
    if (typeof checkFn !== "function")
        return;
    pify_1.default(findFiles_1.getStageFiles)().then(function (files) {
        if (files && files.length) {
            checkFn(findFiles_1.jsFilesFilter(files));
        }
        else {
            pify_1.default(findFiles_1.getCommitTimes)().then(function (commitNum) {
                if (commitNum > 1) {
                    pify_1.default(findFiles_1.getCommitDiffFiles)().then(function (files) {
                        if (files.length) {
                            checkFn(findFiles_1.jsFilesFilter(files));
                        }
                        else {
                            checkFn();
                        }
                    });
                }
                else {
                    //lint all
                    checkFn();
                }
            });
        }
    });
}
exports.default = lintFile;
