import { ApiModelProperty } from '@nestjs/swagger';
import { ValidateNested, IsNotEmpty, IsDefined, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared';

export class SuspendedCourseDto {
  @ApiModelProperty()
  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @IsDefined()
  readonly timeRange: DatePeriodRangeDto;

  @ApiModelProperty()
  @IsNotEmpty()
  @Length(5, 5)
  readonly classroomID: string;
}
