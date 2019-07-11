import { Test, TestingModule } from '@nestjs/testing';
import { SemesterCourseService } from './semester-course.service';

describe('SemesterCourseService', () => {
  let service: SemesterCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemesterCourseService],
    }).compile();

    service = module.get<SemesterCourseService>(SemesterCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
