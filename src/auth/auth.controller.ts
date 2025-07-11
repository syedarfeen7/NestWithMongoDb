import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  login(@Query('phoneNumber') phoneNumber: string) {
    return this.AuthService.login(phoneNumber);
  }

  @Get('/otp-verification')
  otpVerification(@Query() query: { otp: string; phoneNumber: string }) {
    const { otp, phoneNumber } = query;
    return this.AuthService.otpVerification({ phoneNumber, otp });
  }
}
