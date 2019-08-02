import { IsNotEmpty, Length } from 'class-validator';

export class CreateCardRecordDto {
  @Length(8, 8)
  readonly uid: string;

  @Length(5, 5)
  readonly classroomID: string;

  @IsNotEmpty()
  readonly recordTime: Date;

  readonly status: number;
}
