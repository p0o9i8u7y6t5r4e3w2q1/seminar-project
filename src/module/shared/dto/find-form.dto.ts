import { ApiModelProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class FindFormDto {
  @ApiModelProperty()
  @Length(8, 8)
  readonly formID: string;
}
