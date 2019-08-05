import {
  ValidateNested,
  IsString,
  IsNotEmpty,
  IsArray,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

export class CreateGeneralBookingFormDto {
  @IsNotEmpty()
  @IsString()
  readonly applicantName: string;

  @IsEmail()
  readonly email: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;

  @IsNotEmpty()
  @IsString()
  readonly reason: string;

  @IsString()
  readonly classroomID: string;

  @IsArray()
  readonly equipmentIDs: string[];
}
