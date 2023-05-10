import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Body() body: AuthDto) {
    return this.authService.login(req.user);
  }
}
