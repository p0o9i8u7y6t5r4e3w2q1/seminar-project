import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsIn } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { Period } from '../../../util';
import { DatePeriodRange } from '../../../model/common';
import { PeriodNotGreaterThan }from '../decorator/period-not-greater-than.decorator'

export class DatePeriodRangeDto {
  @ApiModelProperty({ type: String, format: 'date', example: '2018-01-01' })
  @IsDate()
  @Type(() => Date)
  @Expose()
  readonly date: Date;

  @ApiModelProperty()
  @IsIn(Period)
  @PeriodNotGreaterThan('endPeriod')
  @Expose()
  readonly startPeriod: string;

  @ApiModelProperty()
  @IsIn(Period)
  @Expose()
  readonly endPeriod: string;

  toDatePeriodRange() {
    return new DatePeriodRange(this);
  }
}
