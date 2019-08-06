import { ApiModelProperty } from '@nestjs/swagger';
import { ValidateNested, IsNotEmpty, Length, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

export class CreateMakeupCourseFormDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly personID: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly scID: string;

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
