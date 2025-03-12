import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register.user.dto';
import { Utils } from '../shared/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  private generateOtp(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { phoneNumber } = registerUserDto;
    const existingUser = await this.userModel
      .findOne({
        phoneNumber,
      })
      .exec();
    if (existingUser) {
      throw new ConflictException('error.userAlreadyExist');
    }
    const user = await this.userModel.create(registerUserDto);
    return user;
  }

  async login(phoneNumber: string): Promise<{ message: string }> {
    phoneNumber = Utils.formatPhoneNumber(phoneNumber);
    const user = await this.userModel.findOne({ phoneNumber });
    if (!user) {
      throw new NotFoundException('error.noUserFound');
    }

    const otp = this.generateOtp();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;

    await user.save();

    return {
      message: 'success.otpSent',
    };
  }

  async otpVerification({
    otp,
    phoneNumber,
  }: {
    otp: string;
    phoneNumber: string;
  }): Promise<User> {
    phoneNumber = Utils.formatPhoneNumber(phoneNumber);

    const user = await this.userModel.findOne({ phoneNumber });

    if (!user) throw new NotFoundException('error.noUserFound');

    if (user?.otp !== otp || !otp)
      throw new NotFoundException('error.invalidOtp');

    if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
      throw new NotFoundException({
        message: 'error.otpExpired',
      });
    }

    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    return user;
  }
}
