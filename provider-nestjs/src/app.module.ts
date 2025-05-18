import { IUser2Service } from './app.interface';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    // AppService,
    // { provide: AppService, useClass: AppService },
    { provide: 'app_service', useClass: AppService },
    {
      provide: 'user_service',
      useValue: {
        name: 'hoatep',
        age: 18,
      },
    },
    {
      provide: 'user2_service',
      useFactory() {
        return {
          name: 'hoatepdev',
          age: 20,
        };
      },
    },
    {
      provide: 'app_user_service',
      useFactory(appService: AppService, userService: IUser2Service) {
        return {
          service: appService.getHello(),
          name: userService.name,
        };
      },
      inject: ['app_service', 'user2_service'],
    },
    {
      provide: 'async_service',
      useFactory: async () => {
        await new Promise((resolve) => {
          return setTimeout(resolve, 3000);
        });

        return {
          name: 'hoatepdev123',
          age: 20,
        };
      },
    },
  ],
})
export class AppModule {}
