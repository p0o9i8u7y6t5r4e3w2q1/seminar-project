import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsIn } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { Period } from '../../../util';

export class DatePeriodRangeDto {
  @ApiModelProperty({ type: String, format: 'date', example: '2018-01-01' })
  @IsDate()
  @Type(() => Date)
  @Expose()
  readonly date: Date;

  @ApiModelProperty()
  @IsIn(Period)
  @Expose()
  readonly startPeriod: string;

  @ApiModelProperty()
  @IsIn(Period)
  @Expose()
  readonly endPeriod: string;
}
