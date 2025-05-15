import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PreCharge } from './types/pre-charge.type';

@Injectable()
export class CanviService {
  constructor(private readonly httpService: HttpService) {}

  async token(client_id: string, private_key: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.post('/token', { client_id, private_key }),
    );

    const { data } = response;
    return data.token;
  }

  async generatePix(preCharge: PreCharge, token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('/pix', preCharge, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Erro ao criar cobrança no PIX API:',
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException('Falha ao criar cobrança no PIX');
    }
  }
}
