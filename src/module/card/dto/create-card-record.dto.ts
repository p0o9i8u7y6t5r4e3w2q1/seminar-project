import { IsEnum, IsDefined, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { SwipeCardResult } from '../../../util';

export class CreateCardRecordDto {
  @Length(8, 8)
  @IsString()
  readonly uid: string;

  @Length(5, 5)
  @IsString()
  readonly classroomID: string;

  @Type(() => Date)
  @IsDefined()
  readonly recordTime: Date;

  @IsEnum(SwipeCardResult)
  readonly status: SwipeCardResult;
}
