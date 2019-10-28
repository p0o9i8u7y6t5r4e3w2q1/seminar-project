import {
  UseInterceptors,
  Controller,
  Inject,
  Get,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles, AuthenticatedGuard, RolesGuard } from '../user';
import { RoleType } from '../../util';
import { SseService } from './sse.service';
import { SSE } from './sse';
import { Observable } from 'rxjs';
import { SseInterceptor } from './sse.interceptor';

@ApiUseTags('sse')
@Controller('sse')
@UseInterceptors(SseInterceptor)
export class SseController {
  constructor(
    @Inject(SseService)
    private readonly sseService: SseService,
  ) {}

  @ApiOperation({ title: '查詢待審核申請數量' })
  @Get('forms/count')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.DeptHead, RoleType.Staff)
  async getPendingFormsCount(@Req() req: any, @Res() res: any) {
    this.sseService.findPendingFormsCount(req.user.roleID, res.sse);
  }
}
