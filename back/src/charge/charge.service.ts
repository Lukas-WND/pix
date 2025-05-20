import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

import { CreateChargeDTO } from './dto/create-charge.dto';

import { User } from 'src/user/entities/user.entity';
import { Charge, Type, Status } from './entities/charge.entity';

import { PreCharge } from 'src/canvi/types/pre-charge.type';
import { CanviService } from 'src/canvi/canvi.service';
import { QueryPixResponse } from 'src/canvi/types/query-pix-response.type';
import { GeneratePixResponse } from 'src/canvi/types/generate-pix-response.type';
import { SimulatePixPayment } from 'src/canvi/types/simulate-payment.type';
import { ChargeHistory } from './entities/history.entity';

@Injectable()
export class ChargeService {
  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepository: Repository<Charge>,

    @InjectRepository(ChargeHistory)
    private readonly historyRespository: Repository<ChargeHistory>,

    private readonly canviService: CanviService,
  ) {}

  private async queryChargeDetails(charge: Charge, token: string) {
    return charge.type === Type.DINAMIC
      ? this.canviService.queryDinamicCharge(charge.id_invoice, token)
      : this.canviService.queryStaticCharge(charge.id_invoice, token);
  }

  private mapApiStatus(apiStatus: string): Status {
    switch (apiStatus) {
      case 'created':
        return Status.CREATED;
      case 'expired':
        return Status.EXPIRED;
      case 'paid':
        return Status.PAID;
      default:
        return Status.CREDITED;
    }
  }

  private extractPixId(
    tipoTransacao: string,
    data: GeneratePixResponse['data'],
  ): number | null {
    if (tipoTransacao === 'pixCashin') {
      return data.id_invoice_pix ?? null;
    } else {
      return data.id_invoice_pix_documento ?? null;
    }
  }

  private toPreChargeDTO(dto: CreateChargeDTO): PreCharge {
    return {
      valor: dto.amount,
      vencimento: dto.type === 'pixCashin' ? dto.due_date : undefined,
      descricao: dto.description,
      texto_instrucao: dto.instruction,
      tipo_transacao: dto.type,
      identificador_externo: randomUUID(),
      identificador_movimento: randomUUID(),
      enviar_qr_code: true,
    };
  }

  private async getToken(user: User) {
    return this.canviService.token(user.client_id, user.private_key);
  }

  private parseQrCode(qrcode: QueryPixResponse['qrcode']): string | null {
    if (!qrcode.data) return null;

    const buffer = Buffer.from(qrcode.data);
    return buffer.toString('utf-8');
  }

  private async findChargeById(id: string) {
    const charge = await this.chargeRepository.findOneBy({ id });
    if (!charge) {
      throw new NotFoundException(`Cobrança #${id} não encontrada`);
    }

    return charge;
  }

  private async createHistory(user: User, charge: Charge) {
    const history = this.historyRespository.create({
      id_charge: charge.id,
      id_invoice: charge.id_invoice,
      type: charge.type,
      amount: charge.amount,
      description: charge.description,
      instruction: charge.instruction,
      id_external: charge.id_external,
      id_transaction: charge.id_transaction,
      due_date: charge.due_date,
      status: charge.status,
      customer_name: charge.customer_name,
      customer_email: charge.customer_email,
      customer_doc_type: charge.customer_doc_type,
      customer_doc_value: charge.customer_doc_value,
      user: user.id,
    });

    return await this.historyRespository.save(history);
  }

  async findAll(userId: string): Promise<Charge[]> {
    return await this.chargeRepository.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });
  }

  async create(createChargeDTO: CreateChargeDTO, user: User) {
    const token = await this.getToken(user);
    const preCharge = this.toPreChargeDTO(createChargeDTO);
    const generatedPix = await this.canviService.generateCharge(
      preCharge,
      token,
    );
    const idPix = this.extractPixId(
      preCharge.tipo_transacao,
      generatedPix.data,
    );

    if (!idPix) {
      throw new BadGatewayException(
        'Erro ao recuperar dados do serviço de pagamentos',
      );
    }

    const charge = this.chargeRepository.create({
      amount: preCharge.valor,
      id_invoice: idPix,
      type:
        preCharge.tipo_transacao === 'pixCashin' ? Type.DINAMIC : Type.STATIC,
      description: preCharge.descricao,
      instruction: preCharge.texto_instrucao,
      id_external: preCharge.identificador_externo,
      id_transaction: preCharge.identificador_movimento,
      due_date: preCharge.vencimento,
      status: Status.CREATED,
      user,
    });

    const chargeSaved = await this.chargeRepository.save(charge);

    await this.createHistory(user, chargeSaved);

    return chargeSaved;
  }

  async findOne(user: User, id: string) {
    const charge = await this.findChargeById(id);
    if (!charge) {
      throw new NotFoundException(`Cobrança #${id} não encontrada`);
    }

    const token = await this.getToken(user);
    const apiDetails = await this.queryChargeDetails(charge, token);

    return {
      id: charge.id,
      status: this.mapApiStatus(apiDetails.status),
      brcode: apiDetails.brcode,
      qrcode: this.parseQrCode(apiDetails.qrcode),
    };
  }

  async remove(id: string) {
    const result = await this.chargeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Cobrança #${id} não encontrada para remoção`,
      );
    }
    return { message: `Charge #${id} removida com sucesso` };
  }

  async simulatePayment(user: User, id: string) {
    const charge = await this.findChargeById(id);

    if (!charge) {
      throw new NotFoundException(`Cobrança #${id} não encontrada`);
    }

    const token = await this.getToken(user);

    const paymentPayload: SimulatePixPayment = {
      id: charge.id_invoice,
      tipo_transacao:
        charge.type === Type.DINAMIC ? 'pixCashin' : 'pixStaticCashin',
      pix: {
        pagamento: {
          valor: charge.amount.toString(),
          pagador: {
            id: '012.345.678-90',
            nome: 'Cliente Pagador',
          },
        },
      },
    };

    const payment_response_code =
      await this.canviService.simulateDinamicPayment(paymentPayload, token);

    if (payment_response_code === 200) {
      charge.status = Status.PAID;
      await this.chargeRepository.save(charge);
    }

    await this.createHistory(user, charge);

    return charge;
  }
}
