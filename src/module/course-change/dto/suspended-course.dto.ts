import { ValidateNested, IsString, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

// XXX 可能需要修改
export class SuspendedCourseDto {
  @IsNotEmpty()
  @Length(8, 9)
  @IsString()
  readonly personID: string;

  @IsNotEmpty()
  @IsString()
  readonly scID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;
}
