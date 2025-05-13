import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { LoginDTO, LoginSchema } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() loginDTO: LoginDTO, @Res() res: Response) {
    const authResponse = await this.authService.login(
      loginDTO.username,
      loginDTO.password,
    );

    const cookie = authResponse.headers['set-cookie'];

    if (cookie) {
      res.setHeader('Set-Cookie', cookie);
    }

    return res.json(authResponse.data);
  }
}
