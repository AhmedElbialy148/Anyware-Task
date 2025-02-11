import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
;

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('check-auth')
  @UseGuards(AccessTokenGuard)
  checkAuth() {
    return { authenticated: true };
    // return this.authService.login();
  }

}
