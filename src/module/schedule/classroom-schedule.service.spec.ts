import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ClassroomScheduleService } from './classroom-schedule.service';

export const ClassroomScheduleProviders = [
  ClassroomScheduleService,
  {
    provide: 'ScheduleRepository',
    useClass: Repository,
  },
  {
    provide: 'ScheduleChangeRepository',
    useClass: Repository,
  },
  {
    provide: 'BookingFormRepository',
    useClass: Repository,
  },
  {
    provide: 'MakeupCourseFormRepository',
    useClass: Repository,
  },
];

describe('ClassroomScheduleService', () => {
  let service: ClassroomScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: ClassroomScheduleProviders,
    }).compile();

    service = module.get<ClassroomScheduleService>(ClassroomScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
