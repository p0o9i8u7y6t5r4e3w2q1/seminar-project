import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  Validate,
  ValidateIf,
  Length,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsArray,
  IsEmail,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Classroom, Equipment } from '../../../model/entity';
import { DatePeriodRangeDto, IsValidId } from '../../shared';
import { ScheduleNotConflictConstraint }from '../../schedule';

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
  @Validate(ScheduleNotConflictConstraint)
  readonly timeRange: DatePeriodRangeDto;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly reason: string;

  @ApiModelProperty()
  @ValidateIf(o => !o.equipmentIDs)
  @Length(5, 5)
  @IsValidId(Classroom)
  readonly classroomID: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @ValidateIf(o => !o.classroomID)
  @IsArray()
  @IsValidId(Equipment)
  readonly equipmentIDs?: string[];
}
