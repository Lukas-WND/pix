import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };

    const [at, rt] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: 'at-secret',
        expiresIn: 60 * 15,
      }),

      await this.jwtService.signAsync(payload, {
        secret: 'rt-secret',
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

  async signin(loginDTO: LoginDTO): Promise<Tokens> {
    const { username, password } = loginDTO;

    const user = await this.userService.findOneByUsername(username);

    const confirm = user && (await compare(password, user.password));
    if (!confirm) {
      throw new UnauthorizedException('Usuário ou Senha inválidos');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout() {}

  async refreshTokens() {}
}
