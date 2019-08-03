import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ClassroomScheduleService } from './classroom-schedule.service';
import {
  ClassroomDateSchedule,
  ScheduleResult,
  IRoomSchedule,
} from '../../model/common';
import { RoomStatus } from '../../util';

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

class MockSchedule implements IRoomSchedule {
  constructor() {}

  // public getClassroomID(): string {return null;}
  public getScheduleResult(): ScheduleResult {
    return new ScheduleResult({ status: RoomStatus.Pending });
  }
  public getRelatedPeriods(date: Date, classroomID: string): string[] {
    return ['5'];
  }
}

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

  test('isPriorResult', () => {
    const oldResult = new ScheduleResult({ status: RoomStatus.Reserved });
    const newResult = new ScheduleResult({ status: RoomStatus.Pending });
    expect((service as any).isPriorResult(oldResult, newResult)).toBeFalsy();
  });

  test('merge', () => {
    const date = new Date();
    const classroomID = '61101';
    const cds = new ClassroomDateSchedule(classroomID, date);
    const oldResult = new ScheduleResult({ status: RoomStatus.MakeupCourse });
    cds.setScheduleResult('5', oldResult);

    const roomSchedule: IRoomSchedule = new MockSchedule();
    (service as any).merge(cds, roomSchedule);
    expect(cds.getScheduleResult('5')).toEqual(oldResult);

    cds.setScheduleResult('5', null);
    (service as any).merge(cds, roomSchedule);
    expect(cds.getScheduleResult('5')).toEqual(
      roomSchedule.getScheduleResult()
    );
  });
});
