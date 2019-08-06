import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly userID: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
