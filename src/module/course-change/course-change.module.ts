import { Module } from '@nestjs/common';
import { CourseChangeController } from './course-change.controller';
import { CourseChangeService } from './course-change.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '../schedule';
import { UserModule } from '../user';
import { SemesterCourseModule } from '../semester-course';
import {
  MakeupCourseForm,
  ScheduleChange,
  SemesterCourse,
} from '../../model/entity';
import { CourseChangeTestController } from './course-change.test.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MakeupCourseForm,
      ScheduleChange,
      SemesterCourse,
    ]),
    ScheduleModule,
    SemesterCourseModule,
    UserModule,
  ],
  controllers: [CourseChangeController, CourseChangeTestController],
  providers: [CourseChangeService],
})
export class CourseChangeModule {}
