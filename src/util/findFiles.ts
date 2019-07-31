import sgf from "staged-git-files";
import findParentDir from "find-parent-dir";
import {exec} from 'child_process';

// filter js file
export function jsFilesFilter(files) {
    return files.filter(filepath => /\.js$/.test(filepath));
}

// get stage files
export function getStageFiles(cb) {
    const gitDir = findParentDir.sync(process.cwd(), ".git");
    sgf.cwd = gitDir;
    let stageFiles = [];
    sgf("ACM", (err, files) => {
        if (files) {
            stageFiles = files.map(item => {
                return item.filename;
            });
        }
        cb(err, stageFiles);
    });
}

// get commit times
export function getCommitTimes(cb) {
    exec("git rev-list --all --count", (err, stdout, stderr) => {
        if (err) {
            console.log("err:", err);
        } else {
        }
        cb(err, Number(stdout));
    });
}

// get last commit files
export function getCommitDiffFiles(cb) {
    let result = [];
    const command = "git diff --name-status HEAD~ HEAD";
    const getArrList = (str, type) => {
        const arr = str.split("\n");
        return arr.filter(item => {
            const regex = new RegExp(`^${type}.*`);
            if (regex.test(item)) {
                return item !== undefined;
            }
        });
    };
    const formatList = (arr, type) => {
        return arr.map(item => {
            return item.replace(/\s/g, "").replace(type, "");
        });
    };
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log("err:", err);
            console.log("stderr:", stderr);
        } else {
            const typeList = ["A", "C", "M"];
            let arr;
            typeList.forEach(type => {
                arr = getArrList(stdout, type);
                arr = formatList(arr, type);
                if (arr.length > 0) {
                    result = result.concat(arr);
                }
            });
        }
        cb(err, result);
    });
}

