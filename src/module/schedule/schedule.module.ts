import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BookingForm,
  ScheduleChange,
  Schedule,
  MakeupCourseForm,
} from '../../model/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingForm,
      ScheduleChange,
      Schedule,
      MakeupCourseForm,
    ]),
  ],
  providers: [ScheduleService, ClassroomScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService, ClassroomScheduleService],
})
export class ScheduleModule {}
