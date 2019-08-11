import { ApiModelProperty } from '@nestjs/swagger';
import { ValidateNested, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

// XXX 可能需要修改
export class SuspendedCourseDto {
  @ApiModelProperty()
  @Length(8, 9)
  readonly personID: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly scID: string;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;
}
