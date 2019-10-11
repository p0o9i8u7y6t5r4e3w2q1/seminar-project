import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly id: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty()
  @IsEmail()
  readonly email: string;
}
