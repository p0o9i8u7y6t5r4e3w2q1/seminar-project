import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { InformService } from './service/inform.service';
import { MailService } from './service/mail.service';
import { DtoValidationPipe } from './pipe/dto-validation.pipe';
import { RolesGuard } from './guard/roles.guard';

@Module({
  providers: [
    InformService,
    MailService,
    {
      provide: APP_PIPE,
      useClass: DtoValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [InformService, MailService],
})
export class SharedModule {}
