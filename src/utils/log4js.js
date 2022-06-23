import log4js from "log4js"

log4js.configure({

    appenders: {
        // defino dos soportes de salida de datos
        infoConsole: { type: "console" },
        warnFile: { type: "file", filename: "warn.log" },
        errorFile: { type: "file", filename: "error.log" },
        // defino sus niveles de logueo
        logInfo: {
          type: "logLevelFilter",
          appender: "infoLog",
          level: "info",
        },
        logWarn: {
          type: "logLevelFilter",
          appender: "warnFile",
          level: "warn",
        },
        logError: {
            type: "logLevelFilter",
            appender: "errorFile",
            level: "error",
        },
    },

    categories: {
        default: {
          appenders: ["logInfo"],
          level: "all",
        },
        fileWarn: {
          appenders: ["warnFile"],
          level: "all",
        },
        fileError: {
            appenders: ["errorFile"],
            level: "all",
        },
    },
});
  
export default log4js