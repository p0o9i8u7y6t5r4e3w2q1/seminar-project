import { ScheduleResult } from './schedule-result';

export interface IRoomSchedule {
  /**
   * 取得教室狀況結果，對應RoomStatus
   * @param from 指定開始日期
   * @param to 指定結束日期
   */
  getScheduleResults(from: Date, to: Date): ScheduleResult[];
}
