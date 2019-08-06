import { ApiModelProperty } from '@nestjs/swagger';
import { ValidateNested, IsString, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

// XXX 可能需要修改
export class SuspendedCourseDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @Length(8, 9)
  @IsString()
  readonly personID: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly scID: string;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;
}
