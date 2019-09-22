import { Module } from '@nestjs/common';
import { InformService } from './service/inform.service';
import { MailService } from './service/mail.service';
import { UtilController } from './util.controller';
import { UtilService } from './util.service';

@Module({
  controllers: [UtilController],
  providers: [UtilService, InformService, MailService],
  exports: [InformService, MailService],
})
export class SharedModule {}
