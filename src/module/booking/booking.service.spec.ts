import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { ScheduleProviders } from '../schedule/schedule.service.spec';
import { Repository } from 'typeorm';

export const BookingProviders = [
  BookingService,
  {
    provide: 'BookingFormRepository',
    useClass: Repository,
  },
  ...ScheduleProviders,
];

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: BookingProviders,
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
