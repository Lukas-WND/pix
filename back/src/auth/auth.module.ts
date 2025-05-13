import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule.register({ timeout: 30000, maxRedirects: 5 }), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
