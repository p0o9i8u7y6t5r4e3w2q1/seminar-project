import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleUtil } from './schedule-util';

describe('ScheduleUtil', () => {
  let provider: ScheduleUtil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleUtil],
    }).compile();

    provider = module.get<ScheduleUtil>(ScheduleUtil);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
