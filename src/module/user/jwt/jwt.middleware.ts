import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { PayloadService } from './payload.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @Inject(PayloadService) private readonly tokenService: PayloadService,
  ) {}

  use(req: any, res: any, next: () => any) {
    const token = this.tokenService.getToken(req);
    if (token) {
      let payload: any;
      try {
        payload = this.tokenService.verifyToken(token);
      } catch (error) {
        payload = null;
      }
      req.jwt = { token, payload, pass: payload != null };
    }
    next();
  }
}
