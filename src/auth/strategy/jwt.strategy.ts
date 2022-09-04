import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_KEY'),
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      firtName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      role: payload.role,
    };
  }
}
