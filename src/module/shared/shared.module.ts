import { Module } from '@nestjs/common';
import { ScheduleUtil } from './schedule-util';
import { InformService } from './inform/inform.service';
import { MailService } from './mail/mail.service';
import { InformService } from './inform.service';
import { MailService } from './mail.service';

@Module({
  providers: [ScheduleUtil, InformService, MailService]
})
export class SharedModule {}
