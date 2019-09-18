import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly userID: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}
