import {getStageFiles, jsFilesFilter, getCommitTimes, getCommitDiffFiles} from './findFiles';
import pify from 'pify';
export default function lintFile(checkFn) {
    if (typeof checkFn !== "function") return;
    pify(getStageFiles)().then(files => {
        if (files && files.length) {
            checkFn(jsFilesFilter(files));
        } else {
            pify(getCommitTimes)().then(commitNum => {
                if (commitNum > 1) {
                    pify(getCommitDiffFiles)().then(files => {
                        if (files.length) {
                            checkFn(jsFilesFilter(files));
                        } else {
                            checkFn();
                        }
                    });
                } else {
                    //lint all
                    checkFn();
                }
            });
        }
    });
}