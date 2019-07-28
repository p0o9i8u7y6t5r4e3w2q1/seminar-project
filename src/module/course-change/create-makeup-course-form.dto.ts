import { ValidateNested, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../shared/date-period-range.dto';

export class CreateMakeupCourseFormDto {
  @IsNotEmpty()
  readonly personID: string;

  @IsNotEmpty()
  readonly scID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;

  @IsNotEmpty()
  @Length(5, 5)
  readonly classroomID: string;
}
