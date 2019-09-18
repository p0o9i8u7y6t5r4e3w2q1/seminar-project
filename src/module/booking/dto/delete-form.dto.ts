import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class DeleteFormDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;
}
