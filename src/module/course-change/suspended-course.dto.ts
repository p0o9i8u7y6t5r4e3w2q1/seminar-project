import { ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../shared/date-period-range.dto';

// XXX 可能需要修改
export class SuspendedCourseDto {
  @IsNotEmpty()
  readonly personID: string;

  @IsNotEmpty()
  readonly scID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;
}
