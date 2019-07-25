import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomScheduleService } from './classroom-schedule.service';

describe('ClassroomScheduleService', () => {
  let service: ClassroomScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassroomScheduleService],
    }).compile();

    service = module.get<ClassroomScheduleService>(ClassroomScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
