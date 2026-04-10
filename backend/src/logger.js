const pino = require("pino");
const { pinoHttp } = require("pino-http");

const logger = pino({
  level: "info",
  base: null,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty" }
      : undefined,
});

const httpLogger = pinoHttp({
  logger,

  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400 || err) return "error";
    return "info";
  },

  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} completed`;
  },

  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} failed`;
  },
});

module.exports = { logger, httpLogger };
