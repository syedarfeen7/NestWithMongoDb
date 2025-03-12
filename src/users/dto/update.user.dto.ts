import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'error.firstNameRequired' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'error.lastNameRequired' })
  lastName: string;

  @IsEmail({}, { message: 'error.invalidEmail' })
  email: string;

  @IsString()
  id?: string;
}
