import {
  format,
  isWithinInterval,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';
import { Period } from './constant-manager';

export class DateUtil {
  static now(): Date {
    const date = new Date();
    const myTimeZone = 8;
    date.setTime(date.valueOf() + myTimeZone * 60 * 60 * 1000);
    console.log(date);
    return date;
  }

  static nextDay(date: Date): Date {
    return DateUtil.addDays(date, 1);
  }

  static addDays(date: Date, num: number): Date {
    const result = new Date(date);
    result.setDate(date.getUTCDate() + num);
    return result;
  }

  static isSameDate(a: Date, b: Date): boolean {
    return a.toDateString().substring(4) === b.toDateString().substring(4);
  }

  static toDateString(date: Date, fm: string = 'yyyy-MM-dd'): string {
    return format(date, fm);
  }

  static getWeekday(date: Date): number {
    return date.getUTCDay();
  }

  /**
   * diffdays = a - b
   */
  static diffDays(a: Date, b: Date): number {
    return DateUtil.diff(a, b, 'd');
  }

  static diff(a: Date, b: Date, unit?: 'm' | 'h' | 'd'): number {
    switch (unit) {
      case 'd':
        return differenceInDays(a, b);
      case 'h':
        return differenceInHours(a, b);
      case 'm':
        return differenceInMinutes(a, b);
      default:
        return a.valueOf() - b.valueOf();
    }
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
    return isWithinInterval(date, { start: from, end: to });
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
    const result = new Date(date);
    if (start) {
      result.setUTCHours(startHours + idx + 1, 0, 0, 0);
    } else {
      result.setUTCHours(startHours + idx + 1, 10, 0, 0);
    }
    return result;
  }

  static getYearAndSemester(date: Date) {
    let year: number;
    let semester: number;

    const month = date.getUTCMonth() + 1;
    // month是八月以後或二月以前
    if (month >= 8) {
      year = date.getUTCFullYear() - 1911;
      semester = 1;
    } else if (month < 2) {
      year = date.getUTCFullYear() - 1912;
      semester = 1;
    } else {
      year = date.getUTCFullYear() - 1912;
      semester = 2;
    }

    return { year, semester };
  }
}
