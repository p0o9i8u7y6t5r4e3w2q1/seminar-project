import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsArray,
  IsEmail,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';

export class CreateGeneralBookingFormDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly applicantName: string;

  @ApiModelProperty()
  @IsEmail()
  readonly applicantEmail: string;

  @ApiModelProperty()
  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @IsDefined()
  readonly timeRange: DatePeriodRangeDto;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly reason: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly classroomID: string;

  @ApiModelPropertyOptional()
  @IsArray()
  @IsOptional()
  readonly equipmentIDs?: string[];
}
