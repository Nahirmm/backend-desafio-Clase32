import log4js from "log4js"

log4js.configure({

    appenders: {
        // defino los soportes de salida de datos
        appInfoConsole: { type: "console" },
        appWarnFile: { type: "file", filename: "./src/logs/warn.log" },
        appErrorFile: { type: "file", filename: "./src/logs/error.log" },
        // defino sus niveles de logueo
        logInfo: { type: "logLevelFilter", appender: "appInfoConsole", level: "info" },
        logWarn: { type: "logLevelFilter", appender: "appWarnFile", level: "warn" },
        logError: { type: "logLevelFilter", appender: "appErrorFile", level: "error" },
    },
    
    categories: {
        default: { appenders: ["logInfo"], level: "all" },
        categWarn: { appenders: ["logWarn"], level: "all" },
        categError: { appenders: ["logError"], level: "all" },
    },
});

export const loggerInfo = log4js.getLogger('default')
export const loggerWarn = log4js.getLogger('categWarn')
export const loggerError = log4js.getLogger('categError')