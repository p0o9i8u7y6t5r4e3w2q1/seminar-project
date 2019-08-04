import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { Repository } from 'typeorm';
import { ScheduleChangeType } from '../../util';
import { CreateScheduleChangeDto } from './dto';

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

  test('createScheduleChanges', () => {
    const dto: CreateScheduleChangeDto = {
      personID: 'H34054087',
      scID: '1081H344900',
      formID: 'MF000003',
      type: ScheduleChangeType.Added,
      timeRange: {
        date: new Date(2019, 7, 1),
        startPeriod: '6',
        endPeriod: '7',
      },
      classroomID: '61101',
    };
    service.createScheduleChanges(dto);
  });
});
