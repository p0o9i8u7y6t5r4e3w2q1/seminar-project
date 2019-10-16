import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { BookingModule } from './module/booking/booking.module';
import { ScheduleModule } from './module/schedule/schedule.module';
import { SharedModule } from './module/shared/shared.module';
import { CourseChangeModule } from './module/course-change/course-change.module';
import { CardModule } from './module/card/card.module';
import { SemesterCourseModule } from './module/semester-course/semester-course.module';
import { JwtMiddleware } from './module/user/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './config/ormconfig.localhost';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    UserModule,
    BookingModule,
    ScheduleModule,
    SharedModule,
    CourseChangeModule,
    CardModule,
    SemesterCourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
