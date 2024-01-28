import { createLogger, format, LoggerOptions, transports } from 'winston';

export const winstonConfig: LoggerOptions = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: format.combine(format.colorize({ all: true })),
    }),
    new transports.File({
      filename: 'app.log',
      level: 'debug',
      handleExceptions: true,
      format: format.combine(format.align(), format.timestamp()),
    }),
  ],
});
