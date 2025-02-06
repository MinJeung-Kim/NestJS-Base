import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      // 비밀번호, 만료 시간 검즘
      //   jwtFromRequest: (req) => {
      //     const token = req.headers.Authorization;
      //     const accessToken = token.toLowercase().replace('bearer ', '');

      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myPw',
    });
  }

  validate(payload) {
    return { id: payload.sub };
  }
}
