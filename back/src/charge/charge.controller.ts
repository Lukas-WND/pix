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
  findOne(@Param('id') id: string) {
    return this.chargeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto) {
    return this.chargeService.update(id, updateChargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargeService.remove(+id);
  }
}
