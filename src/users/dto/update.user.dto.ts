import {
  IsBase64,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'error.firstNameRequired' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'error.lastNameRequired' })
  lastName: string;

  @IsEmail({}, { message: 'error.invalidEmail' })
  email: string;

  @IsMongoId()
  id?: string;

  @IsString()
  @IsNotEmpty({ message: 'error.phoneNumberRequired' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'error.addressRequired' })
  address: string;
}
export class uploadImageDto {
  @IsString()
  @IsNotEmpty({ message: 'error.imageRequired' })
  profileImage: string;

  @IsMongoId()
  id: string;
}
