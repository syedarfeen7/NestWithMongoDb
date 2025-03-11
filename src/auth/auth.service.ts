import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register.user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    try {
      const { phoneNumber } = registerUserDto;
      const existingUser = await this.userModel
        .findOne({
          phoneNumber,
        })
        .exec();
      if (existingUser) {
        throw new ConflictException(
          `User with phone number ${phoneNumber} is already exist`,
        );
      }
      const user = await this.userModel.create(registerUserDto);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Failed to register user: ${errorMessage}`,
      );
    }
  }
}
