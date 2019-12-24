import { Column, Not, In, SelectQueryBuilder } from 'typeorm';
import { dateTransformer } from '../transformer/date.transformer';
import { Transform } from 'class-transformer';
import { DateUtil, Period } from '../../util';

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

  public makeFindOption() {
    const startIndex = Period.indexOf(this.startPeriod);
    const endIndex = Period.indexOf(this.endPeriod);
    const timeCondition: any = {
      date: DateUtil.toDateString(this.date),
    };

    if (startIndex !== 0) {
      timeCondition.endPeriod = Not(In(Period.slice(0, startIndex)));
    }

    if (endIndex !== Period.length - 1) {
      timeCondition.startPeriod = Not(In(Period.slice(endIndex + 1)));
    }

    return timeCondition;
  }

  public makeWhereSelectQuery(
    queryBuilder: SelectQueryBuilder<any>,
    alias: string,
    whereType: string,
  ): SelectQueryBuilder<any> {
    const startIndex = Period.indexOf(this.startPeriod);
    const endIndex = Period.indexOf(this.endPeriod);

    const dateCondition = `${alias}.date = :date`;
    const dateParam = { date: DateUtil.toDateString(this.date) };

    let result: SelectQueryBuilder<any>;
    if (whereType === '' || whereType == null) {
      result = queryBuilder.where(dateCondition, dateParam);
    } else if (whereType === 'and') {
      result = queryBuilder.andWhere(dateCondition, dateParam);
    } else if (whereType === 'or') {
      result = queryBuilder.orWhere(dateCondition, dateParam);
    } else {
      return queryBuilder;
    }

    if (endIndex !== Period.length - 1) {
      result = result
        .andWhere(`${alias}.startPeriod NOT IN (:...sPeriods)`)
        .setParameter('sPeriods', Period.slice(endIndex + 1));
    }

    if (startIndex !== 0) {
      result = result
        .andWhere(`${alias}.endPeriod NOT IN (:...ePeriods)`)
        .setParameter('ePeriods', Period.slice(0, startIndex));
    }

    return result;
  }
}
