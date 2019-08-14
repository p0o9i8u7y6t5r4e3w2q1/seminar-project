import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DatePeriodRangeDto, Requires } from '../../shared';
import {
  IsArray,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsEmail,
  IsDefined,
} from 'class-validator';

@Requires(['classroomID'], ['equipmentIDs'])
export class CreateIIMBookingFormDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly applicantID: string;

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
