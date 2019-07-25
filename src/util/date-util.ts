import * as moment from 'moment';
import { Period } from './constant-manager';

export class DateUtil {
  static nextDay(date: Date): Date {
    const d: Date = new Date(date);
    d.setDate(date.getDate() + 1);
    return d;
  }

  static isSameDate(lDate: Date, rDate: Date): boolean {
    return (
      lDate.getFullYear() === rDate.getFullYear() &&
      lDate.getMonth() === rDate.getMonth() &&
      lDate.getDate() === rDate.getDate()
    );
  }

  static toDateString(date: Date): string {
    return moment(date).format('YYYY/MM/DD');
  }

  static diffDays(from: Date, to: Date): number {
    return moment(to).diff(from, 'days');
  }

  static getWeekdays(from: Date, to: Date): number[] {
    const diffDays = DateUtil.diffDays(from, to);
    if (diffDays >= 7) return [0, 1, 2, 3, 4, 5, 6];

    const weekdays: number[] = [];
    const startWeekday = from.getDay();
    for (let i = 0; i < diffDays; i++) {
      weekdays.push((startWeekday + i) % 7);
    }
    return weekdays;
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
}
