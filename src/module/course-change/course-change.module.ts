import { Module } from '@nestjs/common';
import { CourseChangeController } from './course-change.controller';
import { CourseChangeService } from './course-change.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '../schedule/schedule.module';
import { UserModule } from '../user/user.module';
import {
  MakeupCourseForm,
  ScheduleChange,
  SemesterCourse,
} from '../../model/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MakeupCourseForm,
      ScheduleChange,
      SemesterCourse,
    ]),
    ScheduleModule,
    UserModule,
  ],
  controllers: [CourseChangeController],
  providers: [CourseChangeService],
})
export class CourseChangeModule {}
