import { Module } from '@nestjs/common';
import { CanviService } from './canvi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
      baseURL: process.env.CANVI_API_URL,
    }),
  ],
  providers: [CanviService],
  exports: [CanviService]
})
export class CanviModule {}
