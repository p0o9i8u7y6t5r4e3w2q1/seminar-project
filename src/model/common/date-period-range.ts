import { Column } from 'typeorm';

export class DatePeriodRange {
  @Column()
  date: Date;

  @Column()
  startPeriod: string;

  @Column()
  endPeriod: string;

  constructor() {}

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getStartPeriod(): string {
    return this.startPeriod;
  }

  public setStartPeriod(startPeriod: string): void {
    this.startPeriod = startPeriod;
  }

  public getEndPeriod(): string {
    return this.endPeriod;
  }

  public setEndPeriod(endPeriod: string): void {
    this.endPeriod = endPeriod;
  }
}
