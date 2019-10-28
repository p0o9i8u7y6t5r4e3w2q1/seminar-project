import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleChange, Schedule } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';
import { SharedModule } from '../shared';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SemesterCourseRepository,
      ScheduleChange,
      Schedule,
    ]),
    SharedModule,
  ],
  providers: [ScheduleService, ClassroomScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService, ClassroomScheduleService],
})
export class ScheduleModule {}
