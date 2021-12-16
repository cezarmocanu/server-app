import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  constructor(private configService: ConfigService) {}

  private getSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  signJwt(payload): string {
    const token = jwt.sign(payload, this.getSecret());
    return token;
  }

  verifyJwt(token): boolean {
    try {
      return jwt.verify(token, this.getSecret());
    } catch (error) {
      return false;
    }
  }

  authorizeRequest(headers){
    if (!headers.authorization) {
      return false;
    }

    const [_, token] = headers.authorization.split(' ');

    if (!token) {
      return false;
    }

    if (!this.verifyJwt(token)) {
      return false;
    }

    return true;
  }
}
