import { Test, TestingModule } from '@nestjs/testing';
import { CourseChangeController } from './course-change.controller';

describe('CourseChange Controller', () => {
  let controller: CourseChangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseChangeController],
    }).compile();

    controller = module.get<CourseChangeController>(CourseChangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
