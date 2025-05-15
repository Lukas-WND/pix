import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PreCharge } from './types/pre-charge.type';
import { GeneratePixResponse } from './types/generate-pix-response.type';
import { QueryPixResponse } from './types/query-pix-response.type';
import { SimulatePixPayment } from './types/simulate-payment.type';

@Injectable()
export class CanviService {
  constructor(private readonly httpService: HttpService) {}

  async token(client_id: string, private_key: string): Promise<string> {
    const { token } = await this.post<{ token: string }>('/token', {
      client_id,
      private_key,
    });

    return token;
  }

  async generateCharge(
    preCharge: PreCharge,
    token: string,
  ): Promise<GeneratePixResponse> {
    const charge = await this.post<GeneratePixResponse>(
      '/pix',
      preCharge,
      token,
    );

    return charge;
  }

  async queryDinamicCharge(
    id_invoice_pix: number,
    token: string,
  ): Promise<QueryPixResponse> {
    const { data } = await this.post<{ data: QueryPixResponse }>(
      '/pix/dinamico/consulta',
      { id_invoice_pix },
      token,
    );
    return data;
  }

  async queryStaticCharge(
    id_documento: number,
    token: string,
  ): Promise<QueryPixResponse> {
    const { data } = await this.post<{ data: QueryPixResponse }>(
      '/pix/estatico/documento',
      { id_documento },
      token,
    );

    return data;
  }

  async simulateDinamicPayment(
    payment_data: SimulatePixPayment,
    token: string,
  ) {
    const data = await this.post<{ data: string }>(
      'desenvolvedor/simular_baixa',
      payment_data,
      token,
    );

    console.log('simulate', data)
    return data;
  }

  private async post<T>(
    url: string,
    body: any,
    token?: string,
    handleErrors = true,
  ): Promise<T> {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return response.data;
    } catch (error) {
      if (handleErrors) {
        console.error(
          `Erro ao fazer POST em ${url}:`,
          error.response?.data || error.message,
        );
        throw new InternalServerErrorException(`Falha ao acessar ${url}`);
      } else {
        throw error;
      }
    }
  }
}
