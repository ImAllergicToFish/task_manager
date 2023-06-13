import Log4js, { Logger } from 'log4js';
import path from "path"

class LoggerService {
    private logger: Logger;

    private tokens = {
        utcTime: function (logEvent: any) {
            return logEvent.startTime.toISOString();
        },
    }

    constructor(taskName: string) {
        Log4js.configure({
            appenders: {
                console: {
                    type: 'console',
                    layout: {
                        type: 'pattern',
                        pattern: '[%x{utcTime}] [%p]: %m',
                        tokens: this.tokens
                    },
                },
                singleFile: {
                    type: "file",
                    filename: path.join(__dirname, "..", "..", "logs", taskName, "ALL.log"),
                    maxLogSize: 1048576, //1 mb
                    backups: 3,
                    layout: {
                        type: 'pattern',
                        pattern: '[%x{utcTime}] [%p]: %m',
                        tokens: this.tokens
                    },
                },
                multi: {
                    type: 'multiFile',
                    base: `logs/${taskName}`,
                    maxLogSize: 1048576, //1 mb
                    backups: 3,
                    property: 'level',
                    extension: '.log',
                    layout: {
                        type: 'pattern',
                        pattern: '[%x{utcTime}] [%p]: %m',
                        tokens: this.tokens
                    },
                },
            },
            categories: {
                default: { appenders: ['multi','console', 'singleFile'], level: 'debug' },
            }
        })
        this.logger = Log4js.getLogger()
    }

    log(message: string) {
        this.logger.log(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }
}

export default LoggerService