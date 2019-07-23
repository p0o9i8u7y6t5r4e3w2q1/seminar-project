import { Moment } from 'moment';

export class DatePeriod {
  date: Moment;

  weekday: number;

  period: string;

  /**
   * @param dateTime
   */
  constructor() {}

  public getDate(): Moment {
    return this.date;
  }

  public setDate(date: Moment): void {
    this.date = date;
  }

  public getWeekday(): number {
    return this.weekday;
  }

  public setWeekday(weekday: number): void {
    this.weekday = weekday;
  }

  public getPeriod(): string {
    return this.period;
  }

  public setPeriod(period: string): void {
    this.period = period;
  }
}
