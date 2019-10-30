import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsBoolean } from 'class-validator';
import { Classroom } from '../../../model/entity';
import { IsValidId } from '../../shared';

export class CheckAuthorizationDto {
  @ApiModelProperty()
  @Length(8, 8)
  readonly uid: string;

  @ApiModelProperty()
  @Length(5, 5)
  @IsValidId(Classroom)
  readonly classroomID: string;

  @ApiModelProperty()
  @IsBoolean()
  readonly turnOn: boolean;
}
