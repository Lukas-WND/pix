import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { randomUUID } from 'crypto';
import { firstValueFrom } from 'rxjs';

import { Charge } from './entities/charge.entity';
import { CreateChargeDTO } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { Type, Status } from './entities/charge.entity';

@Injectable()
export class ChargeService {
  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepository: Repository<Charge>,
    private readonly httpService: HttpService,
  ) {}

  async create(createChargeDTO: CreateChargeDTO, token: string) {
    const preCharge = this.mapToPreCharge(createChargeDTO);

    const apiResponse = await this.sendChargeToPixApi(preCharge, token);

    const id_pix = this.extractPixId(
      preCharge.tipo_transacao,
      apiResponse.data,
    );

    const charge = this.chargeRepository.create({
      amount: preCharge.valor,
      id_invoice: id_pix,
      type:
        preCharge.tipo_transacao === 'pixCashin' ? Type.DINAMIC : Type.STATIC,
      description: preCharge.descricao,
      instruction: preCharge.texto_instrucao,
      id_external: preCharge.identificador_externo,
      id_transaction: preCharge.identificador_movimento,
      due_date: preCharge.vencimento,
      status: Status.CREATED,
      qr_code: apiResponse.data.qrcode
    });

    await this.chargeRepository.save(charge);

    return {
      id_invoice: charge.id_invoice,
      brcode: apiResponse.data.brcode,
      qrcode: apiResponse.data.qrcode,
    };
  }

  private mapToPreCharge(dto: CreateChargeDTO) {
    return {
      valor: dto.amount,
      vencimento: dto.due_date,
      descricao: dto.description,
      texto_instrucao: dto.instruction,
      tipo_transacao: dto.type,
      identificador_externo: randomUUID(),
      identificador_movimento: randomUUID(),
      enviar_qr_code: true,
    };
  }

  private async sendChargeToPixApi(preCharge: any, token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('/pix', preCharge, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erro ao criar cobrança no PIX API:',
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException('Falha ao criar cobrança no PIX');
    }
  }

  private extractPixId(tipo_transacao: string, data: any): number {
    return tipo_transacao === 'pixCashin'
      ? data.id_invoice_pix
      : data.id_invoice_pix_documento;
  }

  async findAll(userId: string, token: string) {
    const allChargesOfUser = await this.chargeRepository.find();

    return allChargesOfUser;
  }

  async findOne(id: string) {
    const charge = await this.chargeRepository.findOneBy({ id });
    if (!charge) {
      throw new InternalServerErrorException(`Charge #${id} não encontrada`);
    }
    return charge;
  }

  async update(id: string, updateChargeDto: UpdateChargeDto) {
    await this.chargeRepository.update(id, updateChargeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.chargeRepository.delete(id);
    if (result.affected === 0) {
      throw new InternalServerErrorException(
        `Charge #${id} não encontrada para remoção`,
      );
    }
    return { message: `Charge #${id} removida com sucesso` };
  }
}
