import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { randomUUID } from 'crypto';
import { firstValueFrom } from 'rxjs';

import { Charge } from './entities/charge.entity';
import { CreateChargeDTO } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { Type, Status } from './entities/charge.entity';
import { UserService } from 'src/user/user.service';
import { CanviService } from 'src/canvi/canvi.service';
import { PreCharge } from 'src/canvi/types/pre-charge.type';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChargeService {
  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepository: Repository<Charge>,
    private readonly canviService: CanviService,
    private readonly userService: UserService,
  ) {}

  private async getUser(userId: string): Promise<User> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async create(createChargeDTO: CreateChargeDTO, userId: string) {
    const user = await this.getUser(userId);

    console.log('user: ', user)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const token = await this.canviService.token(
      user.client_id,
      user.private_key,
    );
    const pre_charge = this.mapToPreCharge(createChargeDTO);

    const generated_pix = await this.canviService.generatePix(
      pre_charge,
      token,
    );

    const id_pix = this.extractPixId(
      pre_charge.tipo_transacao,
      generated_pix.data,
    );

    const charge = this.chargeRepository.create({
      amount: pre_charge.valor,
      id_invoice: id_pix,
      type:
        pre_charge.tipo_transacao === 'pixCashin' ? Type.DINAMIC : Type.STATIC,
      description: pre_charge.descricao,
      instruction: pre_charge.texto_instrucao,
      id_external: pre_charge.identificador_externo,
      id_transaction: pre_charge.identificador_movimento,
      due_date: pre_charge.vencimento,
      status: Status.CREATED,
      qr_code: generated_pix.data.qrcode,
      user: user,
    });

    await this.chargeRepository.save(charge);

    return {
      id_invoice: charge.id_invoice,
      brcode: generated_pix.data.brcode,
      qrcode: generated_pix.data.qrcode,
    };
  }

  private mapToPreCharge(dto: CreateChargeDTO): PreCharge {
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

  private extractPixId(tipo_transacao: string, data: any): number {
    return tipo_transacao === 'pixCashin'
      ? data.id_invoice_pix
      : data.id_invoice_pix_documento;
  }

  async findAll(userId: string) {
    const charges = await this.chargeRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return charges;
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
