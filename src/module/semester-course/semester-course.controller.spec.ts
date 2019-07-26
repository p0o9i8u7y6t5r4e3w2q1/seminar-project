import { Test, TestingModule } from '@nestjs/testing';
import { SemesterCourseController } from './semester-course.controller';
import { Repository } from 'typeorm';

describe('SemesterCourse Controller', () => {
  let controller: SemesterCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemesterCourseController],
      providers: [
        {
          provide: 'SemesterCourseRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<SemesterCourseController>(SemesterCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
