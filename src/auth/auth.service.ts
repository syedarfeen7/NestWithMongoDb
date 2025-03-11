import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      const { phoneNumber } = registerDto;
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
      const user = await this.userModel.create(registerDto);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }
}
