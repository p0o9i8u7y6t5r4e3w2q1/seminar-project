import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenService } from './token.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @Inject(TokenService) private readonly tokenService: TokenService,
  ) {}

  use(req: any, res: Response, next: () => any) {
    const token = this.tokenService.getToken(req);
    if (token) {
      let payload: any;
      try {
        payload = this.tokenService.verify(token);
      } catch (error) {
        payload = null;
      }
      req.jwt = { token, payload, pass: payload != null };
    }
    next();
  }
}
