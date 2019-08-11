import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { Period } from '../../../util';

export class DatePeriodRangeDto {
  @ApiModelProperty()
  @IsDate()
  @Type(() => Date)
  readonly date: Date;

  @ApiModelProperty()
  @IsIn(Period)
  readonly startPeriod: string;

  @ApiModelProperty()
  @IsIn(Period)
  readonly endPeriod: string;
}
