import { UserService } from './../../user/user.service';
import { User } from './../../user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('User not found : ' + email);

    if (user.password === password) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid Password');
    }
  }
}
