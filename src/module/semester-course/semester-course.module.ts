import { Module } from '@nestjs/common';
import { SemesterCourseController } from './semester-course.controller';
import { SemesterCourseService } from './semester-course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';
import { CrawlingService } from './crawling.service';
import { UserModule } from '../user/user.module';
import { SemesterCourseTestController } from './semester-course.test.controller';
import { AccessAuthService } from './access-auth/access-auth.service';
import { AccessGuard } from './access-auth/access.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([SemesterCourseRepository, Teacher]),
    UserModule,
  ],
  controllers: [SemesterCourseController, SemesterCourseTestController],
  providers: [
    SemesterCourseService,
    CrawlingService,
    AccessAuthService,
    AccessGuard,
  ],
  exports: [AccessGuard, AccessAuthService],
})
export class SemesterCourseModule {}
