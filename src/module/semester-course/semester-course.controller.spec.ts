import { Test, TestingModule } from '@nestjs/testing';
import { SemesterCourseController } from './semester-course.controller';

describe('SemesterCourse Controller', () => {
  let controller: SemesterCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemesterCourseController],
    }).compile();

    controller = module.get<SemesterCourseController>(SemesterCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
