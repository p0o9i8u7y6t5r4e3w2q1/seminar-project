import { Test, TestingModule } from '@nestjs/testing';
import { SemesterCourseService } from './semester-course.service';
import { Repository } from 'typeorm';

export const SemesterCourseProviders = [
  SemesterCourseService,
  {
    provide: 'SemesterCourseRepository',
    useClass: Repository,
  },
];

describe('SemesterCourseService', () => {
  let service: SemesterCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: SemesterCourseProviders,
    }).compile();

    service = module.get<SemesterCourseService>(SemesterCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
