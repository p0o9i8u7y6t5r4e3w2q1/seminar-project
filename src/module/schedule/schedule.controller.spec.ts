import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleProviders } from './schedule.service.spec';
import { ClassroomScheduleProviders } from './classroom-schedule.service.spec';

describe('Schedule Controller', () => {
  let controller: ScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [...ScheduleProviders, ...ClassroomScheduleProviders],
    }).compile();

    controller = module.get<ScheduleController>(ScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
