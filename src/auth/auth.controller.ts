import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './/auth.service';
import { RegisterUserDto } from './dto/register.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.AuthService.register(registerUserDto);
  }

  @Get('/login')
  login(@Param('phoneNumber') phoneNumber: string) {
    return this.AuthService.login(phoneNumber);
  }
}
