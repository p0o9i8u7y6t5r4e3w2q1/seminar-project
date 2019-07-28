import { IsNotEmpty, Length, IsIn, Min, Max } from 'class-validator';

export class CreateSemesterCourseDto {
  @Length(7)
  readonly courseID: string;

  @Min(100)
  readonly year: number;

  @IsIn([1, 2])
  readonly semester: number;

  @Length(2)
  readonly dept: string;

  @Max(999)
  readonly serial: number;

  @IsNotEmpty()
  readonly time: string;

  @Length(8)
  readonly teacherID: string;

  @Length(5)
  readonly classroomID: string;
}
