import { Test, TestingModule } from '@nestjs/testing';
import { CourseChangeService } from './course-change.service';
import { ScheduleProviders } from '../schedule/schedule.service.spec';
import { Repository } from 'typeorm';

export const CourseChangeProviders = [
  CourseChangeService,
  {
    provide: 'MakeupCourseFormRepository',
    useClass: Repository,
  },
  ...ScheduleProviders,
];

describe('CourseChangeService', () => {
  let service: CourseChangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: CourseChangeProviders,
    }).compile();

    service = module.get<CourseChangeService>(CourseChangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
