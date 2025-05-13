import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    const confirm = user && (await compare(password, user.password));
    if (!confirm) {
      throw new UnauthorizedException('Usuário ou Senha inválidos');
    }

    const client_id = user.client_id;
    const private_key = user.private_key;

    const url = process.env.CANVI_API_URL;

    if (!url) {
      throw new InternalServerErrorException(
        'Comunicação com serviço de pagamentos falhou',
      );
    }

    const response = await firstValueFrom(
      this.httpService.post(`${url}/token`, {
        client_id,
        private_key,
      }),
    );

    return response;
  }
}
