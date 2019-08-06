import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsIn, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { Period } from '../../../util';

export class DatePeriodRangeDto {
  @ApiModelProperty()
  @IsDate()
  @Type(() => Date)
  @IsDefined()
  readonly date: Date;

  @ApiModelProperty()
  @IsIn(Period)
  @IsDefined()
  readonly startPeriod: string;

  @ApiModelProperty()
  @IsIn(Period)
  @IsDefined()
  readonly endPeriod: string;
}
