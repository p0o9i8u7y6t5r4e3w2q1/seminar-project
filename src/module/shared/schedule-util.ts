import { Injectable } from '@nestjs/common';
import { Schedule } from '../../model/entity/schedule.entity';
// 錯誤太多，之後再看
@Injectable()
export class ScheduleUtil {
  /**
   * 多個Schedule轉成一個String(表示課程時間)
   */
  schedulesToString(scheds: Schedule[]): string {
    // TODO implement here
    // "..."rest operator
    // return one string
    // 讀入多個schedule物件,依序丟入scheds[]
    // 先sort scheds
    scheds.sort(function(a, b) {
      //雙層排序
      if (a.getWeekday() === b.getWeekday()) {
        if (a.getPeriod() < b.getPeriod()) {
          return -1;
        } else if (a.getPeriod() > b.getPeriod()) {
          return 1;
        } else {
          //impossible
          return 0;
        }
      } else if (a.getWeekday() < b.getWeekday()) {
        return -1;
      } else {
        return 1;
      }
    });
    //若各scheds[]內容中weekday一樣，period加入"-"並
    //合併入堂數較小之schedule period
    //刪除該scheds[]
    var schLen = scheds.length;
    var weekTmp: string; //用來比對星期
    for (var i = 0; i < schLen; i++) {
      weekTmp = scheds[i].getWeekday();
      for (var j = schLen - 1; j >= 0; j--) {
        //從尾端開始比對，for三堂連堂處理
        if (j !== i && scheds[j].getWeekday() === weekTmp) {
          scheds[i].setPeriod(
            scheds[i].getPeriod() + '-' + scheds[j].getPeriod(),
          );
          if (j - i > 1) {
            //如果三堂連堂
            scheds.splice(i + 1, j - i);
          } else {
            //j-i=1
            scheds.splice(j, 1);
          }
        }
      }
    }
    // 建立回傳字串
    // 取出各scheds[]中 weekday 塞到字串"[]"裡面,取出period塞到[]後面,
    // scheds之間加入","
    var returnStr: string;
    for (var i = 0; i < schLen; i++) {
      //不確定這樣寫可否?"+="
      returnStr += '[' + scheds[i].getWeekday + ']' + scheds[i].getPeriod;
      if (i < schLen - 1) {
        returnStr += ',';
      }
    }
    return returnStr;
  }

  /**
   * 一個String(表示上課時間)轉成多個Schedule
   */
  parseSchedules(timeStr: string): Schedule[] {
    // TODO implement here
    // “[1]2-3,[3]2”(課程時間字串，要分割，分割完存成scedule)
    // 先根據","分割,存到dayPeriod[];每個dayPeriod之後會成為一個schedule
    // dayPeriod[0]=[1]2-3
    // dayPeriod[1]=[3]2
    var dayPeriod: string[] = timeStr.split(',');
    // 從dayPeriod[0]開始檢查,如果看到"-",新增一個dayPeriod[],(另建函式處理?)
    // 格式為[n]m; n為原dayPeriod的[]中的星期，m為"-"後面的堂數,並移除"-m"
    // dayPeriod[0]=[1]2
    // dayPeriod[1]=[1]3
    // dayPeriod[2]=[3]2
    // indexOf, splice

    var dayPerLen = dayPeriod.length;
    for (var i = 0; i < dayPerLen; i++) {
      var dashIndex = dayPeriod[i].indexOf('-');
      var firstPeriod = Number(dayPeriod[i].charAt(dashIndex + 1));
      var secondPeriod = Number(dayPeriod[i].charAt(dashIndex - 1));
      var newPeriod = Number(dayPeriod[i].substr(dashIndex + 1, 1));
      if (dashIndex && firstPeriod - secondPeriod > 1) {
        //三堂連堂
        dayPeriod.splice(
          i + 1,
          0,
          '[' + dayPeriod[i].substr(1, 1) + ']' + (newPeriod - 1),
        ); //可以這樣強制轉嗎?
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
    dayPerLen = dayPeriod.length; //可能變長~
    var scheds: Schedule[];
    for (var i = 0; i < dayPerLen; i++) {
      var newSched = new Schedule(
        scID,
        classroomID,
        dayPeriod[i].charAt(1),
        dayPeriod[i].charAt(3),
      );
      scheds.push(newSched);
    }
    // return Schedule 陣列
    return scheds;
  }
}
