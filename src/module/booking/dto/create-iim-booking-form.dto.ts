import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';
import { IsArray, IsNotEmpty, ValidateNested, IsEmail } from 'class-validator';

export class CreateIIMBookingFormDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly applicantID: string;

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
