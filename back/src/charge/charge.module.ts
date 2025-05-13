import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeController } from './charge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from './entities/charge.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Charge]), AuthModule],
  controllers: [ChargeController],
  providers: [ChargeService],
})
export class ChargeModule {}
