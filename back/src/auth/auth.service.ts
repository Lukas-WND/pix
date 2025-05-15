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
import { Response } from 'express';
import { JwtPayload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload: JwtPayload = { userId, email };

    const [at, rt] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: process.env.AT_SECRET_KEY,
        expiresIn: 60 * 15,
      }),

      await this.jwtService.signAsync(payload, {
        secret: process.env.RT_SECRET_KEY,
        expiresIn: 60 * 60 * 24,
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

  async signin(user: User, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() + 1000 * 60 * 15,
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() + 1000 * 60 * 60 * 24,
    );

    const { access_token, refresh_token } = await this.getTokens(
      user.id,
      user.email,
    );

    await this.updateRtHash(user.id, refresh_token);

    response.cookie('Authentication', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: expiresAccessToken,
    });

    response.cookie('Refresh', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: expiresRefreshToken,
    });
  }

  async signup(signupDTO: CreateUserDTO): Promise<Tokens> {
    const hashPassword = await hash(signupDTO.password, 10);

    const newUser = await this.userService.create({
      ...signupDTO,
      password: hashPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    const user = await this.userService.deleteRtHash(userId);

    return user;
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
