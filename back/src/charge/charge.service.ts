import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Charge } from './entities/charge.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ChargeService {
  constructor(
    @InjectRepository(Charge)
    private chargeRepository: Repository<Charge>,
    private readonly authService: AuthService,
  ) {}
  create(createChargeDto: CreateChargeDto) {
    return 'This action adds a new charge';
  }

  async findAll() {
    // try {
    //   const token = await this.authService.login();
    //   console.log(token);

    //   return token;
    // } catch (error) {
    //   throw new InternalServerErrorException(error.message);
    // }

    return `This action returns all charge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} charge`;
  }

  update(id: number, updateChargeDto: UpdateChargeDto) {
    return `This action updates a #${id} charge`;
  }

  remove(id: number) {
    return `This action removes a #${id} charge`;
  }
}
