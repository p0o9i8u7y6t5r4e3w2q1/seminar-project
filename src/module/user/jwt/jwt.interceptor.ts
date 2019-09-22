import {
  Inject,
  Injectable,
  ExecutionContext,
  CallHandler,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptor extends ClassSerializerInterceptor {
  constructor(
    @Inject(TokenService) private readonly tokenService: TokenService,
    @Inject(Reflector) protected readonly reflector: any,
  ) {
    super(reflector);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return super.intercept(context, next).pipe(
      map(data => {
        const response = (data && data.token) ? data : { result: data };
        if (
          request.jwt &&
          request.jwt.pass &&
          !this.tokenService.isInBlacklist(request.jwt.token)
        ) {
          const payload = this.tokenService.getPayload(request.jwt.token);
          if (this.tokenService.isTokenNeedChange(payload)) {
            response.token = this.tokenService.changeToken(payload);
            this.tokenService.addToBlacklist(request.jwt.token);
          }
        }
        console.log(response);
        return response;
      }),
    );
  }
}
