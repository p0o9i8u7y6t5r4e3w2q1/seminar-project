import { Module } from '@nestjs/common';
import { SemesterCourseController } from './semester-course.controller';
import { SemesterCourseService } from './semester-course.service';

@Module({
  controllers: [SemesterCourseController],
  providers: [SemesterCourseService]
})
export class SemesterCourseModule {}
