import { Column } from 'typeorm';

export class DatePeriodRange {
  @Column('date', { name: 'date' })
  private _date: Date;

  @Column('char', { name: 'start_p_id' })
  private _startPeriod: string;

  @Column('char', { name: 'end_p_id' })
  private _endPeriod: string;

  public get date() {
    return this._date;
  }

  public set date(date: Date) {
    this._date = date;
  }

  public get startPeriod() {
    return this._startPeriod;
  }

  public set startPeriod(startPeriod: string) {
    this._startPeriod = startPeriod;
  }

  public get endPeriod() {
    return this._endPeriod;
  }

  public set endPeriod(endPeriod: string) {
    this._endPeriod = endPeriod;
  }
}
