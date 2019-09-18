import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { RoleType } from '../../../util';

export class ChangeRoleDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly userID: string;

  @ApiModelProperty()
  @IsEnum(RoleType)
  readonly role: RoleType;
}
