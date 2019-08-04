import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';
import { IsArray, IsNotEmpty, ValidateNested, IsEmail } from 'class-validator';

export class CreateIIMBookingFormDto {
  @IsNotEmpty()
  readonly applicantID: string;

  @IsEmail()
  readonly email: string;

  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;

  @IsNotEmpty()
  readonly reason: string;

  readonly classroomID: string;

  @IsArray()
  readonly equipmentIDs: string[];
}
