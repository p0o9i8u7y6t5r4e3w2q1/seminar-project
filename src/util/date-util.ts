import * as moment from 'moment';
import { Period } from './constant-manager';

export class DateUtil {
  static now(): Date {
    const date = new Date();
    const myTimeZone = 8;
    date.setTime( date.getTime() + myTimeZone * 60 * 60 * 1000 );
    console.log(date)
    return date;
  }

  static nextDay(date: Date): Date {
    return moment(date)
      .add(1, 'day')
      .toDate();
  }

  static addDays(date: Date, num: number): Date {
    return moment(date)
      .add(num, 'day')
      .toDate();
  }

  static isSameDate(a: Date, b: Date): boolean {
    return moment(a).isSame(b, 'day');
  }

  static toDateString(date: Date, format: string = 'YYYY-MM-DD'): string {
    return moment(date).format(format);
  }

  /**
   * diffdays = a - b
   */
  static diffDays(a: Date, b: Date): number {
    return moment(a).diff(b, 'days');
  }

  static diff(a: Date, b: Date, unit?: string, precise?: boolean): number {
    return moment(a).diff(b, unit as moment.unitOfTime.Diff, precise);
  }

  static getWeekdays(from: Date, to: Date): number[] {
    const diffDays = DateUtil.diffDays(to, from);
    if (diffDays >= 7) return [0, 1, 2, 3, 4, 5, 6];

    const weekdays: number[] = [];
    const startWeekday = from.getDay();
    for (let i = 0; i <= diffDays; i++) {
      weekdays.push((startWeekday + i) % 7);
    }
    return weekdays;
  }

  static isDateInRange(date: Date, from: Date, to: Date) {
    return moment(date).isBetween(from, to, 'day', '[]');
  }

  /**
   * 回傳時間對應到的節次
   * @return string 節次
   */
  static getPeriod(date: Date): string {
    const startHours = 7; // 7:00 <=> period '0'
    const hours = date.getHours();
    const idx = hours - startHours;

    if (idx < 0 || idx >= Period.length) return null;
    else return Period[idx];
  }

  /**
   * 回傳節次對應到的時間
   * @return {Date} 時間，包含最早上、最晚下課的分鐘
   */
  static getTime(date: Date, period: string, start: boolean): Date {
    const idx = Period.indexOf(period);
    if (idx < 0) return null;

    const startHours = 7; // 7:00 <=> period '0'
    if (start) {
      return moment(date)
        .hour(startHours + idx + 1)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toDate();
    } else {
      return moment(date)
        .hour(startHours + idx + 1)
        .minute(10)
        .second(0)
        .millisecond(0)
        .toDate();
    }
  }

  static getYearAndSemester(date: Date) {
    let year: number;
    let semester: number;
    const mom = moment(date);

    // month是八月以後
    if (mom.month() + 1 >= 8) {
      year = mom.year() - 1911;
      semester = 1;
    } else {
      year = mom.year() - 1911 - 1;
      semester = 2;
    }

    return { year, semester };
  }
}
