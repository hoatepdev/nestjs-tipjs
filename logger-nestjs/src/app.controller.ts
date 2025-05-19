import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger();
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('⭐ asdas');

    this.logger.error('1111', AppController.name);
    this.logger.debug('2222', AppController.name);
    this.logger.log('3333', AppController.name);
    this.logger.verbose('4444', AppController.name);
    this.logger.warn('5555', AppController.name);
    this.logger.fatal('6666', AppController.name);

    return this.appService.getHello();
  }
}
