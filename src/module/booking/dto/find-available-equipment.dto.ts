import { ApiModelProperty } from '@nestjs/swagger';
import { DatePeriodRangeDto } from '../../shared/dto/date-period-range.dto';
import { EquipmentType } from '../../../util/constant-manager';
import { ValidateNested, IsDefined, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAvailableEquipmentDto {
  @ApiModelProperty()
  @ValidateNested()
  @Type(() => DatePeriodRangeDto)
  @IsDefined()
  readonly timeRange: DatePeriodRangeDto;

  @ApiModelProperty()
  @IsEnum(EquipmentType)
  readonly equipType: EquipmentType;
}
