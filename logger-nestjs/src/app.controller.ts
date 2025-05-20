/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from './logger/my.loggger';

@Controller()
export class AppController {
  // private logger = new Logger();
  private logger = new MyLogger();

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('⭐ getHello');

    this.logger.error('1111', AppController.name);
    // this.logger.debug('2222', AppController.name);
    this.logger.log('3333', AppController.name);
    // this.logger.verbose('4444', AppController.name);
    this.logger.warn('5555', AppController.name);
    // this.logger.fatal('6666', AppController.name);

    return this.appService.getHello();
  }

  @Post()
  postLog(@Body() body) {
    // this.logger.warn(body);
    this.logger.log('postLog: ', 'body');
    console.log('⭐ body', body);
  }
}
