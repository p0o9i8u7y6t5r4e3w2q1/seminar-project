import { Module } from '@nestjs/common';
import { CourseChangeController } from './course-change.controller';
import { CourseChangeService } from './course-change.service';
import { ScheduleModule } from '../schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakeupCourseForm } from '../../model/entity';

@Module({
  imports: [TypeOrmModule.forFeature([MakeupCourseForm]), ScheduleModule],
  controllers: [CourseChangeController],
  providers: [CourseChangeService],
})
export class CourseChangeModule {}
