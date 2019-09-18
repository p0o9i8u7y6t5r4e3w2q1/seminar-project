import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { RoleType } from '../../../util/constant-manager';

export class CheckFormDto {
  @ApiModelProperty()
  @IsEnum(RoleType)
  readonly roleType: RoleType;

  @ApiModelProperty()
  @IsBoolean()
  readonly isApproved: boolean;
}
