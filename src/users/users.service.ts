import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto, uploadImageDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { id } = updateUserDto;

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('error.userNotFound');
    }

    Object.assign(user, updateUserDto);

    await user.save();

    return user;
  }
  async uploadImage(uploadImageDto: uploadImageDto): Promise<string> {
    const { id } = uploadImageDto;

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('error.userNotFound');
    }

    Object.assign(user, uploadImageDto);

    await user.save();

    return user?.profileImage;
  }
  async findOne(id: string | undefined): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('error.userNotFound');
    }
    return user;
  }
}
