import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { IContext } from 'src/common/interfaces/context';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginInput: LoginInput, context: IContext): Promise<Auth> {
    const { email, password } = loginInput;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');
    }

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    }

    this.setRefreshToken({ user, context });
    const accessToken = this.getAccessToken(user);

    return {
      email: user.email,
      accessToken,
    };
  }

  getAccessToken(user: User) {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: 'myPw', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, context }: { user: User; context: IContext }): void {
    // 브라우저 쿠키에 리플래시 토큰을 저장하여 안전하게 전달
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: 'myRfPw', expiresIn: '2w' },
    );

    // 개발 환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // 배포 환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.백엔드URL; SameSite=None; Secure; httpOnly;`,
    // );
    // context.res.setHeader("Access-Control-Allow-Origin", "https://프론트엔드 URL")
  }
}
