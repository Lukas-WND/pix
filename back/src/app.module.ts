import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './db/data-source';
import { AuthModule } from './auth/auth.module';
import { ChargeModule } from './charge/charge.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource), AuthModule, ChargeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
