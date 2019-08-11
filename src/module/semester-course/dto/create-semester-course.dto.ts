import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, Length, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSemesterCourseDto {
  @ApiModelProperty()
  @Min(100)
  @Type(() => Number)
  readonly year: number;

  @ApiModelProperty()
  @IsIn([1, 2])
  @Type(() => Number)
  readonly semester: number;

  @ApiModelProperty()
  @Length(7, 7)
  readonly courseID: string;

  @ApiModelProperty()
  @Length(0, 1)
  readonly courseNo: string;

  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly time?: string;

  @ApiModelPropertyOptional()
  @Length(8, 8)
  @IsOptional()
  readonly teacherID?: string;

  @ApiModelPropertyOptional()
  @Length(5, 5)
  @IsOptional()
  readonly classroomID?: string;
}
