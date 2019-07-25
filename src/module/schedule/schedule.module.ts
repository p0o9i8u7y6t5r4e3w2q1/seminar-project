import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { BookingService } from '../booking/booking.service';
import { ClassroomScheduleService } from './classroom-schedule.service';

@Module({
  imports: [BookingService],
  providers: [ScheduleService, ClassroomScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService, ClassroomScheduleService],
})
export class ScheduleModule {}
