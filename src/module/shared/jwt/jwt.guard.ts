import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { PayloadService } from './payload.service';

/**
 * 只用來解析Jwt，不做保護用途
 * @link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
 */
@Injectable()
export class JwtGuard {
  constructor(
    @Inject(PayloadService) private readonly payloadService: PayloadService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.payloadService.getToken(request);
    request.payload = this.payloadService.verifyToken(token);

    return true;
  }
}
