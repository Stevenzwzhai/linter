import path from "path";
import {exec, spawn} from "child_process";
import Loading from './util/loading';
import lintFiles from './util/lintFiles';


export default class LintJs {
    constructor(args) {
        let {_, ignore} = args;

        if (ignore) {
            ignore = Array.isArray(ignore) ? ignore : [ignore];
        }

        lintFiles(args => {
            if (!args || args.length) {
                this.init(args, ignore);
            }
        });
    }
    init(args = [], ignores = []) {
        const nodePath = path.resolve(__dirname, "../node_modules");
        const rootPath = process.cwd();
        const target = args.length
            ? args.map(arg => path.resolve(rootPath, arg))
            : [rootPath];

        const lintIgnores = [];
        ignores.forEach(ignore => {
            lintIgnores.push("--ignore-pattern");
            lintIgnores.push(ignore);
        });

        const child = spawn(
            path.resolve(nodePath, ".bin/eslint"),
            ["--ignore-pattern", "node_modules", ...lintIgnores, ...target],
            {stdio: "inherit"}
        );
        const loading = new Loading('lintjs', '');

        child.on("close", code => {
            if (!code) {
                loading.success("lint complete");
            } else {
                loading.fail(`code get errors or warnings`);
                process.exit(code);
            }
        });
    }
}
