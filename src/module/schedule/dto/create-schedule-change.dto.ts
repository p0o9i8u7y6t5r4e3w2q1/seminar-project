import { ApiModelProperty } from '@nestjs/swagger';
import {
  ValidateNested,
  IsEnum,
  IsNotEmpty,
  Length,
  IsDefined,
} from 'class-validator';
import { Type, Expose, plainToClass } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';
import { ScheduleChangeType } from '../../../util';

export class CreateScheduleChangeDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @Expose()
  readonly personID: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @Expose()
  readonly scID: string;

  @ApiModelProperty()
  @Length(8, 8)
  @Expose()
  readonly formID: string;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @IsDefined()
  @Expose()
  readonly timeRange: DatePeriodRangeDto;

  @ApiModelProperty()
  @IsEnum(ScheduleChangeType)
  @Expose()
  readonly type: ScheduleChangeType;

  @ApiModelProperty()
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
