import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientRequest, ServerResponse } from 'http';
import { SSE } from './sse';

// reference:
// https://github.com/serkyron/nestjs-sse
// https://github.com/dpskvn/express-sse
// https://github.com/Yaffle/EventSource
// https://zhuanlan.zhihu.com/p/47099953
// https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events
@Injectable()
export class SseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    this.use(req, res);

    return next.handle();
  }

  use(
    request: { raw: ClientRequest },
    response: { res: ServerResponse } & { sse: SSE },
  ) {
    request.raw.socket.setTimeout(0);
    request.raw.socket.setNoDelay(true);
    request.raw.socket.setKeepAlive(true);

    // header
    // from https://zhuanlan.zhihu.com/p/47099953
    response.res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
    });

    // 2kB of padding (for IE)
    response.res.write(':' + Array(2049).join(' ') + '\n');
    response.res.write('retry: 2000\n\n');

    const sse = new SSE(response.res);
    response.sse = sse; // let controller can get SSE object in nestjs

    response.res.on('close', () => sse.close());
  }
}
