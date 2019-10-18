import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { RoleType } from '../../../util';

export class FilterUserDto {
  @ApiModelPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @Transform((ids: string) => ids.split(','))
  @IsArray()
  roleIDs?: RoleType[];
}
