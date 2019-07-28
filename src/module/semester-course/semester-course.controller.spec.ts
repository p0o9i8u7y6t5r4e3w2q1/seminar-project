import { Test, TestingModule } from '@nestjs/testing';
import { SemesterCourseController } from './semester-course.controller';
import { SemesterCourseProviders } from './semester-course.service.spec';

describe('SemesterCourse Controller', () => {
  let controller: SemesterCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemesterCourseController],
      providers: SemesterCourseProviders,
    }).compile();

    controller = module.get<SemesterCourseController>(SemesterCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
