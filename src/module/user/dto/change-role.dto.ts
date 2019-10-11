import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { RoleType } from '../../../util';

export class ChangeRoleDto {
  @ApiModelProperty()
  @IsEnum(RoleType)
  readonly roleID: RoleType;
}
