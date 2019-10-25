import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Classroom, Equipment } from '../../../model/entity';
import { DatePeriodRangeDto, IsValidId } from '../../shared';
import {
  IsArray,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsEmail,
  IsDefined,
  ValidateIf,
  Length,
} from 'class-validator';

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
  @ValidateIf(o => !o.equipmentIDs)
  @IsValidId(Classroom)
  @Length(5, 5)
  readonly classroomID: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @ValidateIf(o => !o.classroomID)
  @IsArray()
  @IsValidId(Equipment)
  readonly equipmentIDs?: string[];
}
