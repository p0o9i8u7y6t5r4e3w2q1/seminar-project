import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly oldPassword: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly newPassword: string;
}
