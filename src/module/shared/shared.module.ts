import { Module } from '@nestjs/common';
import { InformService } from './service/inform.service';
import { MailService } from './service/mail.service';

@Module({
  providers: [InformService, MailService],
  exports: [InformService, MailService],
})
export class SharedModule {}
