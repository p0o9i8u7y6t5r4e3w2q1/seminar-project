import { ScheduleResult } from './schedule-result';
import { ClassroomDateSchedule } from './classroom-date-schedule';

export interface IRoomSchedule {
  /**
   * 取得Schedule的相關結果，狀態定義在RoomStatus裡
   */
  updateClassroomDateSchedule(cds: ClassroomDateSchedule): void;
  getScheduleResult(): ScheduleResult;
}
