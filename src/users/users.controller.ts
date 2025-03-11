import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }
}
