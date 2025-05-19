import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: string, context: string) {
    console.log(`***INFO***[${context}] | `, message);
  }
  /**
   * Write an 'error' level log.
   */
  error(message: string, context: string) {
    console.log(`***INFO***[${context}] | `, message);
  }
  /**
   * Write a 'warn' level log.
   */
  warn(message: string, context: string) {
    console.log(`***INFO***[${context}] | `, message);
  }
  /**
   * Write a 'debug' level log.
   */
  debug?(message: string, context: string) {
    console.log(`***INFO***[${context}] | `, message);
  }
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: string, context: string) {
    console.log(`***INFO***[${context}] | `, message);
  }
  /**
   * Write a 'fatal' level log.
   */
  fatal?(message: string, context: string) {
    console.log(`***INFO***[${context}] | `, message);
  }
}
