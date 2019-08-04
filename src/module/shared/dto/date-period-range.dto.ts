import { IsDate, IsIn, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { Period } from '../../../util';

export class DatePeriodRangeDto {
  @IsDate()
  @Type(() => Date)
  @IsDefined()
  readonly date: Date;

  @IsIn(Period)
  @IsDefined()
  readonly startPeriod: string;

  @IsIn(Period)
  @IsDefined()
  readonly endPeriod: string;
}
