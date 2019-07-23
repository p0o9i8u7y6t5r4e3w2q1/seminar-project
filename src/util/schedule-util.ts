import { Schedule } from '../model/entity';
import { Period } from './constant-manager';

export class ScheduleUtil {
  /**
   * 將Schedule依照前後排序
   * XXX: need check，或許有更好的寫法
   */
  static sortSchedules(scheds: Schedule[]): void {
    scheds.sort((a, b) => {
      // 雙層排序
      if (a.weekday === b.weekday) {
        if (a.period < b.period) {
          return -1;
        } else if (a.period > b.period) {
          return 1;
        } else {
          // impossible
          return 0;
        }
      } else if (a.weekday < b.weekday) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  /**
   * 多個Schedule轉成一個String(表示課程時間)
   */
  static schedulesToString(scheds: Schedule[]): string {
    // 先sort scheds
    this.sortSchedules(scheds);

    // 若各scheds[]內容中weekday一樣，period加入"-"並
    // 合併入堂數較小之schedule period
    // 刪除該scheds[]
    const schLen: number = scheds.length;
    let weekTmp: number; // 用來比對星期
    for (let i = 0; i < schLen; i++) {
      weekTmp = scheds[i].weekday;
      for (let j = schLen - 1; j >= 0; j--) {
        // 從尾端開始比對，for三堂連堂處理
        if (j !== i && scheds[j].weekday === weekTmp) {
          scheds[i].period = scheds[i].period + '-' + scheds[j].period;
          if (j - i > 1) {
            // 如果三堂連堂
            scheds.splice(i + 1, j - i);
          } else {
            // j-i=1
            scheds.splice(j, 1);
          }
        }
      }
    }
    // 建立回傳字串
    // 取出各scheds[]中 weekday 塞到字串"[]"裡面,取出period塞到[]後面,
    // scheds之間加入","
    let returnStr: string;
    for (let i = 0; i < schLen; i++) {
      // 不確定這樣寫可否?"+="
      returnStr += '[' + scheds[i].weekday + ']' + scheds[i].period;
      if (i < schLen - 1) {
        returnStr += ',';
      }
    }
    return returnStr;
  }

  /**
   * 一個String(表示上課時間)轉成多個Schedule
   */
  static parseSchedules(
    classroomID: string,
    scID: string,
    timeStr: string,
  ): Schedule[] {
    // “[1]2-3,[3]2”(課程時間字串，要分割，分割完存成scedule)
    // 先根據","分割,存到dayPeriod[];每個dayPeriod之後會成為一個schedule
    // dayPeriod[0]=[1]2-3
    // dayPeriod[1]=[3]2
    const dayPeriod: string[] = timeStr.split(',');
    // 從dayPeriod[0]開始檢查,如果看到"-",新增一個dayPeriod[],(另建函式處理?)
    // 格式為[n]m; n為原dayPeriod的[]中的星期，m為"-"後面的堂數,並移除"-m"
    // dayPeriod[0]=[1]2
    // dayPeriod[1]=[1]3
    // dayPeriod[2]=[3]2
    // indexOf, splice

    let dayPerLen: number = dayPeriod.length;
    for (let i = 0; i < dayPerLen; i++) {
      const dashIndex = dayPeriod[i].indexOf('-');
      const firstPeriod: number = Period.indexOf(
        dayPeriod[i].charAt(dashIndex + 1),
      );
      const secondPeriod: number = Number(dayPeriod[i].charAt(dashIndex - 1));
      const newPeriod: number = Number(dayPeriod[i].substr(dashIndex + 1, 1));
      if (dashIndex && firstPeriod - secondPeriod > 1) {
        // 三堂連堂
        dayPeriod.splice(
          i + 1,
          0,
          '[' + dayPeriod[i].substr(1, 1) + ']' + (newPeriod - 1),
        ); // TODO: 可以這樣強制轉嗎?
        dayPeriod.splice(
          i + 2,
          0,
          '[' + dayPeriod[i].substr(1, 1) + ']' + newPeriod,
        );
        dayPeriod[i] = dayPeriod[i].substring(0, dashIndex - 1);
      } else if (dashIndex) {
        dayPeriod.splice(
          i + 1,
          0,
          '[' + dayPeriod[i].substr(1, 1) + ']' + newPeriod,
        );
        dayPeriod[i] = dayPeriod[i].substring(0, dashIndex - 1);
      }
    }

    // 從dayPeriod[0]開始建立Schedule,寫入scID,classroomID,
    // weekday(int)="[]"中數字，period(string)為最後數字
    dayPerLen = dayPeriod.length; // 可能變長~
    let scheds: Schedule[];
    for (let i = 0; i < dayPerLen; i++) {
      // let newSched = new Schedule(
      //  dayPeriod[i].charAt(1),
      //  dayPeriod[i].charAt(3),
      //  classroomID,
      //  scID,
      // );
      // scheds.push(newSched);
    }
    // return Schedule 陣列
    return scheds;
  }
}
