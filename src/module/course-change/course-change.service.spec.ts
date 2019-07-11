import { Test, TestingModule } from '@nestjs/testing';
import { CourseChangeService } from './course-change.service';

describe('CourseChangeService', () => {
  let service: CourseChangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseChangeService],
    }).compile();

    service = module.get<CourseChangeService>(CourseChangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
