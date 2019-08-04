import { ValidateNested, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';
import { ScheduleChangeType } from '../../../util';

export class CreateScheduleChangeDto {
  @IsNotEmpty()
  readonly scID: string;

  @IsNotEmpty()
  readonly formID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;

  @IsNotEmpty()
  readonly type: ScheduleChangeType;

  @IsNotEmpty()
  @Length(5, 5)
  readonly classroomID: string;
}
