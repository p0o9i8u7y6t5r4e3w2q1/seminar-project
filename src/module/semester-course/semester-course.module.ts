import { Module } from '@nestjs/common';
import { SemesterCourseController } from './semester-course.controller';
import { SemesterCourseService } from './semester-course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher, Course } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';
import { CrawlingService } from './crawling.service';
import { UserModule } from '../user/user.module';
import { AccessAuthService } from './access-auth/access-auth.service';
import { AccessGuard } from './access-auth/access.guard';
import { SharedModule } from '../shared';

@Module({
  imports: [
    TypeOrmModule.forFeature([SemesterCourseRepository, Teacher, Course]),
    UserModule,
    // SharedModule,
  ],
  controllers: [SemesterCourseController],
  providers: [
    SemesterCourseService,
    CrawlingService,
    AccessAuthService,
    AccessGuard,
  ],
  exports: [AccessGuard, AccessAuthService],
})
export class SemesterCourseModule {}
