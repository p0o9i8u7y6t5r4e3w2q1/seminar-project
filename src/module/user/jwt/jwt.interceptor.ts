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
import { PayloadService } from './payload.service';

@Injectable()
export class JwtInterceptor extends ClassSerializerInterceptor {
  constructor(
    @Inject(PayloadService) private readonly payloadService: PayloadService,
    @Inject(Reflector) protected readonly reflector: any,
  ) {
    super(reflector);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const payload = this.parsePayload(req);
    req.payload = payload;

    return super.intercept(context, next).pipe(
      map(data => {
        const response = data && data.token ? data : { result: data };

        if (
          payload &&
          !this.payloadService.isBlacklisted(payload) &&
          this.payloadService.isNeedChange(payload)
        ) {
          response.token = this.payloadService.changeToken(payload);
          this.payloadService.blacklisted(payload);
        }
        return response;
      }),
    );
  }

  parsePayload(req: any) {
    const token = this.payloadService.getToken(req);
    let payload: any = null;
    if (token) {
      try {
        payload = this.payloadService.verifyToken(token);
      } catch (error) {
        // do nothing
      }
    }
    return payload;
  }
}
