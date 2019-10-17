import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { InformService } from './service/inform.service';
import { MailService } from './service/mail.service';
import { UtilController } from './util.controller';
import { UtilService } from './util.service';
import { JwtModule } from '@nestjs/jwt';
import { PayloadService, jwtConstants, JwtInterceptor, JwtGuard } from './jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [UtilController],
  providers: [
    UtilService,
    InformService,
    MailService,
    PayloadService,
    {
      provide: APP_INTERCEPTOR,
      useClass: JwtInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [InformService, MailService, PayloadService],
})
export class SharedModule {}
