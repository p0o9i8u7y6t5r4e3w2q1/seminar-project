import { Module } from '@nestjs/common';
import { CourseChangeController } from './course-change.controller';
import { CourseChangeService } from './course-change.service';
import {ScheduleModule} from '../schedule/schedule.module';

@Module({
  imports: [ScheduleModule],
  controllers: [CourseChangeController],
  providers: [CourseChangeService],
})
export class CourseChangeModule {}
