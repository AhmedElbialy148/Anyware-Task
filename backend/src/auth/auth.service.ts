import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { handleError } from 'src/common/helpers/error-handling';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login() {
    try {  
      let accessToken = await this.generateAccessToken()
      return {accessToken}      
    } catch (error) {
      handleError(error);
    }
  }

  async generateAccessToken(){
    return this.jwtService.signAsync(
      {
        authenticated: true,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: `7d`,
      },
    )
  }
}
