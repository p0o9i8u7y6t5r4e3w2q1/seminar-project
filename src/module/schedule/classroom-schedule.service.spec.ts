import { Test, TestingModule } from '@nestjs/testing';
import { Repository, getCustomRepository } from 'typeorm';
import { ClassroomScheduleService } from './classroom-schedule.service';
import { RoomScheduleRepository } from '../../model/repository';
import {
  ClassroomDateSchedule,
  ScheduleResult,
  IRoomSchedule,
} from '../../model/common';
import { RoomStatus } from '../../util';

export const ClassroomScheduleProviders = [
  ClassroomScheduleService,
  {
    provide: 'RoomScheduleRepository',
    useValue: getCustomRepository(RoomScheduleRepository),
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
