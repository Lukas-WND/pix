import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeController } from './charge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from './entities/charge.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
      baseURL: process.env.CANVI_API_URL,
    }),
    TypeOrmModule.forFeature([Charge]),
  ],
  controllers: [ChargeController],
  providers: [ChargeService],
})
export class ChargeModule {}
