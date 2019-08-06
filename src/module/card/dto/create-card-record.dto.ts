import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsDefined, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { SwipeCardResult } from '../../../util';

export class CreateCardRecordDto {
  @ApiModelProperty()
  @Length(8, 8)
  readonly uid: string;

  @ApiModelProperty()
  @Length(5, 5)
  readonly classroomID: string;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDefined()
  readonly recordTime: Date;

  @ApiModelProperty()
  @IsEnum(SwipeCardResult)
  readonly status: SwipeCardResult;
}
