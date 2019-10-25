import { ApiModelProperty } from '@nestjs/swagger';
import { ValidateNested, IsDefined, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Classroom } from '../../../model/entity';
import { DatePeriodRangeDto, IsValidId } from '../../shared';

export class CreateMakeupCourseFormDto {
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
