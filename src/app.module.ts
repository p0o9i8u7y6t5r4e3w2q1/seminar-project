import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { BookingModule } from './module/booking/booking.module';
import { ScheduleModule } from './module/schedule/schedule.module';
import { SharedModule } from './module/shared/shared.module';
import { CourseChangeModule } from './module/course-change/course-change.module';
import { CardModule } from './module/card/card.module';
import { SemesterCourseModule } from './module/semester-course/semester-course.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // UserModule,
    // BookingModule,
    // ScheduleModule,
    // SharedModule,
    // CourseChangeModule,
    // CardModule,
    SemesterCourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
