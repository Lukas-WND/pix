import {
  Controller,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signup')
  // @HttpCode(HttpStatus.CREATED)
  // @UsePipes(new ZodValidationPipe(CreateUserSchema))
  // async signup(@Body() signupDTO: CreateUserDTO) {
  //   return await this.authService.signup(signupDTO);
  // }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async sigin(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signin(user, response);
  }

  // @Delete('logout')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async logout(@Req() req: Request) {
  //   const user = req.user;

  //   return this.authService.logout(user!['sub']);
  // }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signin(user, response);
  }
}
