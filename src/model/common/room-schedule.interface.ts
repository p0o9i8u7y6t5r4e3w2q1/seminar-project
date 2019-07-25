import { ScheduleResult } from './schedule-result';

export interface IRoomSchedule {
  /**
   * 回傳符合自定義條件的節次陣列
   * @return string[] 符合條件的節次陣列，對應Period裡的結果
   */
  getRelatedPeriods(date: Date, classroomID: string): string[];

  /**
   * 取得教室狀況結果，對應RoomStatus
   */
  getScheduleResult(): ScheduleResult;
}
