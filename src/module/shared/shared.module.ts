import { Module } from '@nestjs/common';
import { InformService } from './inform.service';
import { MailService } from './mail.service';

@Module({
  providers: [InformService, MailService],
  exports: [InformService, MailService],
})
export class SharedModule {}
