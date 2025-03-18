import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'error.firstNameRequired' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'error.lastNameRequired' })
  lastName: string;

  @IsEmail({}, { message: 'error.invalidEmail' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'error.phoneNumberRequired' })
  phoneNumber: string;

  @IsBoolean()
  termsAccepted: boolean;
}
