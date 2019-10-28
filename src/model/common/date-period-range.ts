import { Column } from 'typeorm';
import { dateTransformer } from '../transformer/date.transformer';
import { Transform } from 'class-transformer';
import { DateUtil } from '../../util';

export class DatePeriodRange {
  @Column('date', { name: 'date', transformer: [dateTransformer] })
  @Transform(date => DateUtil.toDateString(date))
  date: Date;

  @Column('char', { name: 'start_p_id' })
  startPeriod: string;

  @Column('char', { name: 'end_p_id' })
  endPeriod: string;

  constructor(init?: Partial<DatePeriodRange>) {
    Object.assign(this, init);
  }
}
