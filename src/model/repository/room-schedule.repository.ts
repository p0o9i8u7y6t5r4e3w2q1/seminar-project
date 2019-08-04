import { EntityRepository, EntityManager, Between, In } from 'typeorm';
import { IRoomSchedule } from '../common';
import {
  MakeupCourseForm,
  BookingForm,
  Schedule,
  ScheduleChange,
} from '../entity';
import { DateUtil, FormPendingProgress } from '../../util';

interface FindByClassroomParam {
  classroomID: string;
  from: Date;
  to: Date;
}

interface FindBySemesterCourseParam {
  scID: string;
  from: Date;
  to: Date;
}

// XXX 加上學期的判斷
@EntityRepository()
export class RoomScheduleRepository {
  constructor(private manager: EntityManager) {}

  public findBySemesterCourse(
    type: any,
    param: FindBySemesterCourseParam,
  ): Promise<IRoomSchedule[]> {
    switch (type) {
      case Schedule:
        return this.manager.find(Schedule, {
          scID: param.scID,
          weekday: In(DateUtil.getWeekdays(param.from, param.to)),
        });
      case ScheduleChange:
        return this.manager.find(ScheduleChange, {
          scID: param.scID,
          timeRange: { date: Between(param.from, param.to) },
        });
    }
  }

  public findByClassroom(
    type: any,
    param: FindByClassroomParam,
  ): Promise<IRoomSchedule[]> {
    switch (type) {
      case Schedule:
        return this.manager.find(Schedule, {
          classroomID: param.classroomID,
          weekday: In(DateUtil.getWeekdays(param.from, param.to)),
        });
      case ScheduleChange:
        return this.manager.find(ScheduleChange, {
          classroomID: param.classroomID,
          timeRange: { date: Between(param.from, param.to) },
        });
    }
  }

  public findPendingByClassroom(
    type: any,
    param: FindByClassroomParam,
  ): Promise<IRoomSchedule[]> {
    switch (type) {
      case BookingForm:
        return this.manager.find(BookingForm, {
          classroomID: param.classroomID,
          timeRange: { date: Between(param.from, param.to) },
          progress: In(FormPendingProgress),
        });
      case MakeupCourseForm:
        return this.manager.find(MakeupCourseForm, {
          classroomID: param.classroomID,
          timeRange: { date: Between(param.from, param.to) },
          progress: In(FormPendingProgress),
        });
    }
  }
}
