import { IsDate, IsIn } from 'class-validator';
import { Period } from '../../../util';

export class DatePeriodRangeDto {
  @IsDate()
  readonly date: Date;

  @IsIn(Period)
  readonly startPeriod: string;

  @IsIn(Period)
  readonly endPeriod: string;
}
