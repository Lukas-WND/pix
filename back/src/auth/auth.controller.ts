import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { LoginDTO, LoginSchema } from './dto/login.dto';
import { CreateUserDTO, CreateUserSchema } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async signup(@Body() signupDTO: CreateUserDTO) {
    console.log(signupDTO);
    return await this.authService.signup(signupDTO);
  }

  @Post('signin')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async sigin(@Body() loginDTO: LoginDTO, @Res() res: Response) {
    const { access_token, refresh_token } =
      await this.authService.signin(loginDTO);

    res.setHeader('Set-Cookie', access_token);
    res.setHeader('Set-Cookie', refresh_token);

    return res.json({ access_token, refresh_token }).status(201);
  }

  @Post('logout')
  async logout() {
    this.authService.logout();
  }

  @Post('refresh')
  async refreshToken() {
    this.authService.refreshTokens();
  }
}
