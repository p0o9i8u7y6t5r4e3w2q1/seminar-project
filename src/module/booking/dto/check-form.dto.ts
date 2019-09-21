import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CheckFormDto {
  @ApiModelProperty()
  @IsBoolean()
  readonly isApproved: boolean;
}
