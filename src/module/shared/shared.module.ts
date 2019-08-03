import { Module } from '@nestjs/common';
import { InformService } from './inform.service';
import { MailService } from './mail.service';
import { DtoValidationPipe } from './dto-validation.pipe';

@Module({
  providers: [InformService, MailService, DtoValidationPipe],
  exports: [InformService, MailService, DtoValidationPipe],
})
export class SharedModule {}
