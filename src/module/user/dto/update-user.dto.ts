import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiModelProperty()
  @IsEmail()
  @IsOptional()
  readonly email?: string;
}
