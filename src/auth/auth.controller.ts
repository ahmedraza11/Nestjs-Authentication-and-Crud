import { LoginDto } from './dto/login.dto';
import { User } from './../user/entities/user.entity';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req, @Body() loginDto: LoginDto) {
    const user: User = req.user;
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      userId: user.id,
    };

    return { token: this.jwtService.sign(payload) };
  }
}
