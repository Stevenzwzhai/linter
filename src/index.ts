import { camelizeKeys } from 'humps';
import minimist from 'minimist';
import LintJs from './lintJs';
import LintTs from './lintTs';
import LintStyle from './lintStyle';

const args = minimist(process.argv.slice(2)) || {};

export default function linter() {
    let lintType = '';
    if (args._) {
        lintType = args._[0];
        args._.unshift();
    }
    const lintAll = () => {
        new LintJs(args);
        new LintTs(args);
        new LintStyle(args);
    }
    switch (lintType) {
        case 'js': new LintJs(args);
            break;
        case 'ts': new LintTs(args);
            break;
        case 'style': new LintStyle(args);
            break;
        default:
    }
}
module.exports = exports.defualt;
