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

    return super.intercept(context, next).pipe(
      map(data => {
        const response = data && data.token ? data : { result: data };
        const payload = req.payload;

        if (payload && this.payloadService.isNeedChange(payload)) {
          response.token = this.payloadService.changeToken(payload);
          this.payloadService.blacklisted(payload);
        }
        return response;
      }),
    );
  }
}
