import { Schedule } from '../model/entity';
import { Period } from './constant-manager';

export class ScheduleUtil {
  /**
   * 比較兩個Schedule大小，依星期、節次排序
   */
  static compareSchedules(a: Schedule, b: Schedule): number {
    // 雙層排序
    if (a.weekday !== b.weekday) {
      return a.weekday - b.weekday;
    } else {
      return Period.indexOf(a.period) - Period.indexOf(b.period);
    }
  }

  /**
   * 多個Schedule轉成一個String(表示課程時間)
   * @param scheds 假設所有classroomID, scID都一樣的待轉換陣列
   */
  static schedulesToString(scheds: Schedule[]): string {
    /* 複製一個array */
    const schedsCopy: Schedule[] = scheds.slice();
    // 先sort scheds
    schedsCopy.sort(ScheduleUtil.compareSchedules);

    let idx: number = 0;
    let result: string = '';
    const len = schedsCopy.length;
    while (idx < len) {
      /* 取得相同星期最小、最大的節次 */
      const weekdayTmp = schedsCopy[idx].weekday;
      const minPeriod = schedsCopy[idx].period;
      while (idx < len - 1 && weekdayTmp === schedsCopy[idx + 1].weekday) {
        idx++;
      }
      /* 組合星期字串 */
      if (result !== '') result += ',';
      result += '[' + weekdayTmp + ']';

      /* 組合節次字串 */
      if (minPeriod === schedsCopy[idx].period) {
        result += minPeriod;
      } else {
        result += minPeriod + '~' + schedsCopy[idx].period;
      }

      idx++;
    }

    return result;
  }

  /**
   * 一個String(表示上課時間)轉成多個Schedule
   */
  static parseSchedules(
    timeStr: string,
    classroomID: string,
    scID: string,
  ): Schedule[] {
    const scheds: Schedule[] = [];
    const dayPeriods: string[] = timeStr.split(',');
    dayPeriods.forEach(dayPeriod => {
      /* each dayPeriod :
       * '[<weekday>]<startPeriod>~<endPeriod>'
       * or
       * '[<weekday>]<Period>'
       */
      const weekday: number = Number(dayPeriod.charAt(1));
      const minPeriodIdx: number = Period.indexOf(dayPeriod.charAt(3));
      let maxPeriodIdx: number;

      if (dayPeriod.includes('~')) {
        maxPeriodIdx = Period.indexOf(dayPeriod.charAt(5));
      } else {
        maxPeriodIdx = minPeriodIdx;
      }

      for (let i = minPeriodIdx; i <= maxPeriodIdx; i++) {
        scheds.push(
          new Schedule({ weekday, period: Period[i], classroomID, scID }),
        );
      }
    });

    return scheds;
  }
}
