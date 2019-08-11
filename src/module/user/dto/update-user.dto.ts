import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @ApiModelProperty()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;
}
