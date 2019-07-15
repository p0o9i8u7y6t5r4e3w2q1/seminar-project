export class DatePeriod {
  date: Date;

  weekday: number;

  period: string;

  /**
   * @param dateTime
   */
  constructor() {}

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
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
