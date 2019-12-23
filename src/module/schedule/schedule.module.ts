import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleChange, Schedule } from '../../model/entity';
import {
  SemesterCourseRepository,
  ClassroomRepository,
} from '../../model/repository';
import { SharedModule } from '../shared';
import { ScheduleNotConflictConstraint } from './constraint/schedule-not-conflict.constraint';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SemesterCourseRepository,
      ClassroomRepository,
      ScheduleChange,
      Schedule,
    ]),
    // SharedModule,
  ],
  providers: [
    ScheduleService,
    ClassroomScheduleService,
    ScheduleNotConflictConstraint,
  ],
  controllers: [ScheduleController],
  exports: [
    ScheduleService,
    ClassroomScheduleService,
    ScheduleNotConflictConstraint,
  ],
})
export class ScheduleModule {}
