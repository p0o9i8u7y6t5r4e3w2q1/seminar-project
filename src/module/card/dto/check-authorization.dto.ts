import { ApiModelProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CheckAuthorizationDto {
  @ApiModelProperty()
  @Length(8, 8)
  readonly uid: string;

  @ApiModelProperty()
  @Length(5, 5)
  readonly classroomID: string;
}
