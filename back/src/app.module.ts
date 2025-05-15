import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './db/data-source';
import { AuthModule } from './auth/auth.module';
import { ChargeModule } from './charge/charge.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CanviModule } from './canvi/canvi.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    ChargeModule,
    UserModule,
    CanviModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
