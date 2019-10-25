import { ApiModelProperty } from '@nestjs/swagger';
import { ValidateNested, IsNotEmpty, IsDefined, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Classroom } from '../../../model/entity';
import { DatePeriodRangeDto, IsValidId } from '../../shared';

export class SuspendedCourseDto {
  @ApiModelProperty()
  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @IsDefined()
  readonly timeRange: DatePeriodRangeDto;

  @ApiModelProperty()
  @Length(5, 5)
  @IsValidId(Classroom)
  readonly classroomID: string;
}
