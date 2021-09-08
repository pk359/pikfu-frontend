
export class HttpLogger {
    static disableStyle = false;

    static loggingDisabled = false;
    static setDisableStyle(boo: boolean = true) {
        this.disableStyle = boo;
    }
    static logSystem(
        options: {
            title: 'info' | 'error' | 'success';
            color: string;
            backgroundColor: string;
        },
        ...args: any[]
    ) {
        if (!this.disableStyle) {
            options = {
                ...options,
            };
            this.log(
                `%c[${options.title}]`,
                `background-color: ${options.backgroundColor}; color: ${options.color};`,
                ...args
            );
        } else {
            this.log(...args);
        }
    }

    static logSuccess(...args: any[]) {
        this.logSystem(
            {
                title: 'success',
                color: 'white',
                backgroundColor: 'green',
            },
            ...args
        );
    }

    static logError(...args: any[]) {
        this.logSystem(
            {
                title: 'error',
                color: 'white',
                backgroundColor: 'red',
            },
            ...args
        );
    }

    static logInfo(...args: any[]) {
        this.logSystem(
            {
                title: 'info',
                color: 'black',
                backgroundColor: 'yellow',
            },
            ...args
        );
    }
    private static log(...args: any[]) {
        if (this.loggingDisabled === false) {
            console.log(...args);
        }
    }
}
