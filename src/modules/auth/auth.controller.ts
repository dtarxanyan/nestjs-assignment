import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtAuthenticationGuard } from '@/modules/auth//jwt-authentication.guard';
import { Request } from 'express';
import { LoginDto } from '@/modules/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    const accessToken = this.authService.generateToken(user);
    return { accessToken };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
