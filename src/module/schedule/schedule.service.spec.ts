import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { Repository } from 'typeorm';

export const ScheduleProviders = [
  ScheduleService,
  {
    provide: 'ScheduleRepository',
    useClass: Repository,
  },
  {
    provide: 'ScheduleChangeRepository',
    useClass: Repository,
  },
];

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: ScheduleProviders,
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
