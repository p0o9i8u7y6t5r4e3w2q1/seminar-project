import { ValidateNested, IsNotEmpty, IsArray, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

export class CreateGeneralBookingFormDto {
  @IsNotEmpty()
  readonly applicantName: string;

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
