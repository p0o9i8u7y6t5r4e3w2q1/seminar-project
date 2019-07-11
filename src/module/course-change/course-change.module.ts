import { Module } from '@nestjs/common';
import { CourseChangeController } from './course-change.controller';
import { CourseChangeService } from './course-change.service';

@Module({
  controllers: [CourseChangeController],
  providers: [CourseChangeService]
})
export class CourseChangeModule {}
