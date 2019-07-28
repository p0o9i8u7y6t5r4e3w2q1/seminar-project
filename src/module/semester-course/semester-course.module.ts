import { Module } from '@nestjs/common';
import { SemesterCourseController } from './semester-course.controller';
import { SemesterCourseService } from './semester-course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterCourse } from '../../model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([SemesterCourse])],
  controllers: [SemesterCourseController],
  providers: [SemesterCourseService],
})
export class SemesterCourseModule {}
