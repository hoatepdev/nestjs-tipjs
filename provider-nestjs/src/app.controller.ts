import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { IUser2Service, IUserAppService } from './app.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('app_service') private readonly appService: AppService,
    @Inject('user_service')
    private readonly userService: IUser2Service,
    @Inject('user2_service')
    private readonly user2Service: IUser2Service,
    @Inject('app_user_service')
    private readonly userAppService: IUserAppService,
    @Inject('async_service')
    private readonly asyncService: IUser2Service,
  ) {}

  @Inject('app_service')
  private readonly appNewService: AppService;

  @Get()
  getHello(): string {
    // console.log('app_service:', this.appService);
    // console.log('appNew_service:', this.appNewService);
    // console.log('user_service:', this.userService.name);
    // console.log('user2_service:', this.user2Service.name);
    // console.log('user_app_service:', this.userAppService.name);
    console.log('⭐ async_service', this.asyncService.name);

    // return this.appService.getHello();

    return this.userAppService.service;
  }
}
