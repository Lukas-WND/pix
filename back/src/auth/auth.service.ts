import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens';
import { User } from 'src/user/entities/user.entity';
import { CookieOptions, Response } from 'express';
import { JwtPayload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(
    userId: string,
    email: string,
    at_expires: number,
    rt_expires: number,
  ): Promise<Tokens> {
    const payload: JwtPayload = { userId, email };

    const [at, rt] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: process.env.AT_SECRET_KEY,
        expiresIn: at_expires,
      }),

      await this.jwtService.signAsync(payload, {
        secret: process.env.RT_SECRET_KEY,
        expiresIn: rt_expires,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: string, rt: string) {
    const hashRt = await hash(rt, 10);

    await this.userService.updateRtHash(userId, hashRt);
  }

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.findOneByUsername(username);

      const confirm = user && (await compare(password, user.password));
      if (!confirm) {
        throw new UnauthorizedException('Credenciais inválidas!');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Acesso negado!');
    }
  }

  private cookieConfig(expires?: Date): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires,
    };
  }

  private async setAuthCookies(user: User, response: Response) {
    const at_expires = 1000 * 60 * 15;
    const rt_expires = 1000 * 60 * 60 * 15;

    const expiresAccessToken = new Date(Date.now() + at_expires);
    const expiresRefreshToken = new Date(Date.now() + rt_expires);

    const { access_token, refresh_token } = await this.getTokens(
      user.id,
      user.email,
      at_expires / 1000,
      rt_expires / 1000,
    );

    await this.updateRtHash(user.id, refresh_token);

    response.cookie(
      'Authentication',
      access_token,
      this.cookieConfig(expiresAccessToken),
    );
    response.cookie(
      'Refresh',
      refresh_token,
      this.cookieConfig(expiresRefreshToken),
    );
  }

  async signin(user: User, response: Response) {
    await this.setAuthCookies(user, response);
  }

  async signup(signupDTO: CreateUserDTO, response: Response) {
    const hashPassword = await hash(signupDTO.password, 10);

    const newUser = (await this.userService.create({
      ...signupDTO,
      password: hashPassword,
    })) as User;

    await this.setAuthCookies(newUser, response);
  }

  async logout(user: User, response: Response) {
    await this.userService.deleteRtHash(user.id);

    response.clearCookie('Authentication', this.cookieConfig());
    response.clearCookie('Refresh', this.cookieConfig());
  }

  async validateUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.userService.findOne(userId);
      const authenticated = await compare(refreshToken, user?.refresh_token);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido.');
    }
  }
}
