import { IsNotEmpty } from 'class-validator';

export class CreateScheduleChangeDto {
  @IsNotEmpty()
  readonly scID: string;

  @IsNotEmpty()
  readonly formID: string;

  @IsNotEmpty()
  readonly date: string;

  @IsNotEmpty()
  readonly period: string;

  @IsNotEmpty()
  readonly type: number;
}
