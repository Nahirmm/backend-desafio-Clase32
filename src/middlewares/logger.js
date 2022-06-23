import log4js from "../utils/logs.js"

const logInfo = log4js.getLogger();
const logWarn = log4js.getLogger('fileWarn');

export const myLoggerWarn = (req, res, next) => {
    logWarn.warn("Recurso inexistente " + + req.protocol + '://' + req.get('host') + req.originalUrl);
    res.redirect('/ecommerce')
    next();
};

export const myLoggerInfo = (req, res, next) => {
    logInfo.info("Recurso  exitoso " + req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
};

