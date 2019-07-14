import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService]
})
export class ScheduleModule {}
