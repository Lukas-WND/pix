import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChargeService } from './charge.service';
import { CreateChargeDTO, CreateChargeSchema } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/get-current-user';
import { User } from 'src/user/entities/user.entity';
import {
  SimulatePaymentSchema,
  SimulatePaymentSchemaDTO,
} from './dto/simulate-payment.dto';

@Controller('charges')
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body(new ZodValidationPipe(CreateChargeSchema))
    createChargeDto: CreateChargeDTO,
    @CurrentUser() user: User,
  ) {
    return this.chargeService.create(createChargeDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.chargeService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.chargeService.findOne(user, id);
  }

  @Post('simulate-payment')
  @UseGuards(JwtAuthGuard)
  simulate(
    @CurrentUser() user: User,
    @Body(new ZodValidationPipe(SimulatePaymentSchema))
    charge: SimulatePaymentSchemaDTO,
  ) {
    console.log(charge);
    return this.chargeService.simulatePayment(user, charge.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargeService.remove(id);
  }
}
