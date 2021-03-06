import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsDefined, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { SwipeCardResult } from '../../../util';
import { Classroom } from '../../../model/entity';
import { IsValidId } from '../../shared';

export class CreateCardRecordDto {
  @ApiModelProperty()
  @Length(8, 8)
  readonly uid: string;

  @ApiModelProperty()
  @Length(5, 5)
  @IsValidId(Classroom)
  readonly classroomID: string;

  @ApiModelProperty({
    type: String,
    format: 'date-time',
    example: '2018-11-21T06:20:32.23ZZ',
  })
  @Type(() => Date)
  @IsDefined()
  readonly recordTime: Date;

  @ApiModelProperty()
  @IsEnum(SwipeCardResult)
  readonly swipeResult: SwipeCardResult;
}
