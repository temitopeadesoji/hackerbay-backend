const {
  createLogger,
  format,
  transports,
  add,
  remove,
} = require('winston');
require('winston-daily-rotate-file');

const {
  combine,
  timestamp,
  prettyPrint,
} = format;
const config = require('../config');
// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'warn',
    filename: './logger/logs/app.log',
    handleExceptions: true,
    json: true,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    silent: process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production',
  },
  dailyfile: {
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    filename: 'app-%DATE%.log',
    dirname: './logger/logs',
    level: 'info',
    json: true,
    handleExceptions: true,

  },
};

const dailyTransport = new (transports.DailyRotateFile)(options.dailyfile);

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    // new transports.File(options.file),
    new transports.Console(options.console),
    dailyTransport,
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
