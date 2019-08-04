import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly email: string;
}
