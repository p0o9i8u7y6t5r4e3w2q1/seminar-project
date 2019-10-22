import { Column } from 'typeorm';
import { dateTransformer } from '../transformer/date.transformer';

export class DatePeriodRange {
  @Column('date', { name: 'date', transformer: [dateTransformer] })
  date: Date;

  @Column('char', { name: 'start_p_id' })
  startPeriod: string;

  @Column('char', { name: 'end_p_id' })
  endPeriod: string;

  constructor(init?: Partial<DatePeriodRange>) {
    Object.assign(this, init);
  }
}
