import ora from 'ora';

export default class Loading {
    constructor(name, color) {
        const spinner = ora(`Loading ${name}`).start();

        spinner.color = color || 'yellow';
        spinner.text = `Loading ${name}`;

        this.spinner = spinner;
    }

    spinner = {
        succeed: (msg) => {
            console.log(msg);
        },
        fail: (msg) => {
            console.warn(msg);
        }
    }

    /**
     * Loading success.
     */
    success(msg) {
        this.spinner.succeed(msg);
    }

    /**
     * Loading failure.
     */
    fail(msg) {
        this.spinner.fail(msg);
    }
}