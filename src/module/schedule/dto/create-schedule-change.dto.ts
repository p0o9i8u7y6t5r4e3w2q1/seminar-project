import { ValidateNested, IsNotEmpty, Length } from 'class-validator';
import { Type, Expose, plainToClass } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';
import { ScheduleChangeType } from '../../../util';

export class CreateScheduleChangeDto {
  @IsNotEmpty()
  @Expose()
  readonly personID: string;

  @IsNotEmpty()
  @Expose()
  readonly scID: string;

  @IsNotEmpty()
  @Expose()
  readonly formID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @Expose()
  readonly timeRange: DatePeriodRangeDto;

  @IsNotEmpty()
  @Expose()
  readonly type: ScheduleChangeType;

  @IsNotEmpty()
  @Length(5, 5)
  @Expose()
  readonly classroomID: string;

  static createByAny(data: any) {
    return plainToClass(CreateScheduleChangeDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
