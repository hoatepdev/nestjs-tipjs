/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService, LogLevel } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import chalk from 'chalk';
import * as dayjs from 'dayjs';

export class MyLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      // format: format.combine(
      //   format.colorize(),
      //   format.timestamp(),
      //   format.simple(),
      // ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, message, level, time }) => {
              const strApp = chalk.green('[Nest]');
              const strContext = chalk.yellow(`[${context}]`);
              return `${strApp} - ${time} ${level} ${context} ${strContext} ${message}`;
            }),
          ),
        }),

        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          dirname: 'log',
          filename: 'demo.dev.log',
        }),
      ],
    });
  }
  /**
   * Write a 'log' level log.
   */
  log(message: string, context: string) {
    this.logger.log('info', message, {
      context,
      time: dayjs(Date.now()).format('DD/MM/YYYY - HH:mm:ss'),
    });
  }
  /**
   * Write an 'error' level log.
   */
  error(message: string, context: string) {
    this.logger.log('error', message, {
      context,
      time: dayjs(Date.now()).format('DD/MM/YYYY - HH:mm:ss'),
    });
  }
  /**
   * Write a 'warn' level log.
   */
  warn(message: string, context: string) {
    this.logger.log('warn', message, {
      context,
      time: dayjs(Date.now()).format('DD/MM/YYYY - HH:mm:ss'),
    });
  }
  /**
   * Write a 'debug' level log.
   */
  debug?(message: string, context: string) {
    this.logger.log('debug', message, {
      context,
      time: dayjs(Date.now()).format('DD/MM/YYYY - HH:mm:ss'),
    });
  }
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: string, context: string) {
    this.logger.log('verbose', message, {
      context,
      time: dayjs(Date.now()).format('DD/MM/YYYY - HH:mm:ss'),
    });
  }
  /**
   * Write a 'fatal' level log.
   */
  fatal?(message: string, context: string) {
    this.logger.log('fatal', message, {
      context,
      time: dayjs(Date.now()).format('DD/MM/YYYY - HH:mm:ss'),
    });
  }
  setLogLevels?(levels: LogLevel[]) {}
}
