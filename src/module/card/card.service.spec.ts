import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { ClassroomScheduleProviders } from '../schedule/classroom-schedule.service.spec';
import { Repository } from 'typeorm';

export const CardProviders = [
  CardService,
  {
    provide: 'CardRecordRepository',
    useClass: Repository,
  },
  ...ClassroomScheduleProviders,
];

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: CardProviders,
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
