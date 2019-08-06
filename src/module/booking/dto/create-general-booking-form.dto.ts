import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ValidateNested, IsNotEmpty, IsArray, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

export class CreateGeneralBookingFormDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly applicantName: string;

  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  readonly timeRange: DatePeriodRangeDto;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly reason: string;

  @ApiModelProperty()
  readonly classroomID: string;

  @ApiModelPropertyOptional()
  @IsArray()
  readonly equipmentIDs: string[];
}
