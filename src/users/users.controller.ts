import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }
  @Put('/user')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.UserService.updateUser(updateUserDto);
  }
}
