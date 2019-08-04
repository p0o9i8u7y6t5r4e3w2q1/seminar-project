import { ValidateNested, IsNotEmpty, Length, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

export class CreateMakeupCourseFormDto {
  @IsNotEmpty()
  readonly personID: string;

  @IsNotEmpty()
  readonly scID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @IsDefined()
  readonly timeRange: DatePeriodRangeDto;

  @IsNotEmpty()
  @Length(5, 5)
  readonly classroomID: string;
}
