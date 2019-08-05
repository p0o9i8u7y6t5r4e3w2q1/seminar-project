import { IsNotEmpty, IsString, Length, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSemesterCourseDto {
  @Min(100)
  @Type(() => Number)
  readonly year: number;

  @IsIn([1, 2])
  @Type(() => Number)
  readonly semester: number;

  @Length(7, 7)
  @IsString()
  readonly courseID: string;

  @Length(0, 1)
  @IsString()
  readonly courseNo: string;

  @IsNotEmpty()
  @IsString()
  readonly time: string;

  @Length(8, 8)
  @IsString()
  readonly teacherID: string;

  @Length(5, 5)
  @IsString()
  readonly classroomID: string;
}
