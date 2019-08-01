import { Column } from 'typeorm';

export class DatePeriodRange {
  @Column('date', { name: 'date' })
  date: Date;

  @Column('char', { name: 'start_p_id' })
  startPeriod: string;

  @Column('char', { name: 'end_p_id' })
  endPeriod: string;
}
