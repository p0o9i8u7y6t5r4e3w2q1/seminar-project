import { Column } from 'typeorm';

export class DatePeriodRange {
  private _date: Date;

  private _startPeriod: string;

  private _endPeriod: string;

  /* ---- setter and getter ---- */
  @Column('date', { name: 'date' })
  public get date() {
    return this._date;
  }
  public set date(date: Date) {
    this._date = date;
  }

  @Column('char', { name: 'start_p_id' })
  public get startPeriod() {
    return this._startPeriod;
  }
  public set startPeriod(startPeriod: string) {
    this._startPeriod = startPeriod;
  }

  @Column('char', { name: 'end_p_id' })
  public get endPeriod() {
    return this._endPeriod;
  }
  public set endPeriod(endPeriod: string) {
    this._endPeriod = endPeriod;
  }
}
