import { IsNotEmpty, Length, IsIn, Min } from 'class-validator';

export class CreateSemesterCourseDto {
  @Min(100)
  readonly year: number;

  @IsIn([1, 2])
  readonly semester: number;

  @Length(7, 7)
  readonly courseID: string;

  @Length(0, 1)
  @IsNotEmpty()
  readonly courseNo: string;

  @IsNotEmpty()
  readonly time: string;

  @Length(8, 8)
  readonly teacherID: string;

  @Length(5)
  readonly classroomID: string;
}
