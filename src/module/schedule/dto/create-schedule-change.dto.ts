import {
  ValidateNested,
  IsEnum,
  IsString,
  IsNotEmpty,
  Length,
  IsDefined,
} from 'class-validator';
import { Type, Expose, plainToClass } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';
import { ScheduleChangeType } from '../../../util';

export class CreateScheduleChangeDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly personID: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly scID: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly formID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @IsDefined()
  @Expose()
  readonly timeRange: DatePeriodRangeDto;

  @IsEnum(ScheduleChangeType)
  @Expose()
  readonly type: ScheduleChangeType;

  @IsNotEmpty()
  @Length(5, 5)
  @Expose()
  readonly classroomID: string;

  // "override" 會覆蓋 data 相同的屬性，只是為了使用方便
  static createByAny(data: any, override?: Partial<CreateScheduleChangeDto>) {
    const obj = Object.assign({}, data, override);
    return plainToClass(CreateScheduleChangeDto, obj, {
      excludeExtraneousValues: true,
    });
  }
}
