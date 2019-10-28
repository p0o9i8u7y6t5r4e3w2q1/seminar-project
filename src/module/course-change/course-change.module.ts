import { Module } from '@nestjs/common';
import { CourseChangeController } from './course-change.controller';
import { CourseChangeService } from './course-change.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '../schedule';
import { SharedModule } from '../shared';
import { UserModule } from '../user';
import { SemesterCourseModule } from '../semester-course';
import {
  MakeupCourseForm,
  ScheduleChange,
  SemesterCourse,
  User,
} from '../../model/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MakeupCourseForm,
      ScheduleChange,
      SemesterCourse,
      User,
    ]),
    ScheduleModule,
    SemesterCourseModule,
    UserModule,
    SharedModule,
  ],
  controllers: [CourseChangeController],
  providers: [CourseChangeService],
})
export class CourseChangeModule {}
