import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeController } from './charge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from './entities/charge.entity';
import { UserModule } from 'src/user/user.module';
import { CanviModule } from 'src/canvi/canvi.module';
import { ChargeHistory } from './entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Charge, ChargeHistory]), UserModule, CanviModule],
  controllers: [ChargeController],
  providers: [ChargeService],
})
export class ChargeModule {}
