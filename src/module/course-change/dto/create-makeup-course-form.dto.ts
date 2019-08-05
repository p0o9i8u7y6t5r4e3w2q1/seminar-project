import {
  ValidateNested,
  IsNotEmpty,
  IsString,
  Length,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

export class CreateMakeupCourseFormDto {
  @IsNotEmpty()
  @IsString()
  readonly personID: string;

  @IsNotEmpty()
  @IsString()
  readonly scID: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @IsDefined()
  readonly timeRange: DatePeriodRangeDto;

  @IsNotEmpty()
  @Length(5, 5)
  @IsString()
  readonly classroomID: string;
}
