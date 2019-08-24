import {
  Inject,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    @Inject(TokenService) private readonly tokenService: TokenService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map(data => {
        if (
          request.jwt &&
          request.jwt.pass &&
          !this.tokenService.isInBlacklist(request.jwt.token)
        ) {
          const payload = this.tokenService.getPayload(request.jwt.token);
          if (this.tokenService.isTokenNeedChange(payload)) {
            data.token = this.tokenService.changeToken(payload);
            this.tokenService.addToBlacklist(request.jwt.token);
          }
        }
        return data;
      }),
    );
  }
}
