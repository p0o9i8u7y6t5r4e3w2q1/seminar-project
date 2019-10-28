import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';
import { SseInterceptor } from './sse.interceptor';
import { UserModule } from '../user';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [SseController],
  providers: [SseService, SseInterceptor],
})
export class SseModule {}
