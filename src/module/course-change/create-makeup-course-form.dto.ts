import { ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../booking/dto/date-period-range.dto';

export class CreateMakeupCourseFormDto {
  @IsNotEmpty()
  readonly personID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;
}
