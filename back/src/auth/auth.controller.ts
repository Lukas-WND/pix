import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from './decorators/get-current-user';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateUserDTO, CreateUserSchema } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body(new ZodValidationPipe(CreateUserSchema)) signupDTO: CreateUserDTO,
    @Res() response: Response,
  ) {
    await this.authService.signup(signupDTO, response);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async sigin(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signin(user, response);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signin(user, response);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentUser() user: User, @Res() res: Response) {
    await this.authService.logout(user, res);
  }
}
