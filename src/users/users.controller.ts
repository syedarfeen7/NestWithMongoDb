import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { Multer } from 'multer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly UserService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }

  @Put('/user')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.UserService.updateUser(updateUserDto);
  }

  @Post('/upload/:userId')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadProfileImage(
    @Param('userId') userId: string,
    @UploadedFile() file: Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('error.fileIsRequired');
    }

    const baseUrl = this.configService.get<string>('DEV_URL');
    const profileImage = `${baseUrl}/uploads/${file.filename}`;

    return this.UserService.uploadImage({
      id: userId,
      profileImage,
    });
  }
}
