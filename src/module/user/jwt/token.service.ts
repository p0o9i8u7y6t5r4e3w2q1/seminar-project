import { Request } from 'express';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateUtil } from '../../../util';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class TokenService {
  private blacklist: string[] = [];

  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  createByUser(user: any) {
    const payload = { userID: user.id, generated: new Date() };
    return this.jwtService.sign(payload);
  }

  verify(token: string) {
    const payload = this.jwtService.verify(token);
    return this.isInBlacklist(token) ? null : payload;
  }

  getPayload(token: string) {
    return token ? this.jwtService.decode(token) : null;
  }

  isTokenNeedChange(payload: any) {
    const diff = DateUtil.diff(
      new Date(),
      payload.generated,
      jwtConstants.changeTime.unit,
      true,
    );

    return diff > jwtConstants.changeTime.time;
  }

  changeToken(payload: any) {
    const newPayload = { userID: payload.userID, generated: new Date() };
    return this.jwtService.sign(newPayload);
  }

  getToken(req: Request): string {
    if (req.headers.authorization) {
      const splits = req.headers.authorization.split(' ');
      return splits[0] === 'Bearer' ? splits[1] : null;
    }
    return null;
  }

  addToBlacklist(token: string) {
    this.blacklist.push(token);
  }

  isInBlacklist(token: string): boolean {
    if (token == null) return false;
    return this.blacklist.some(blackToken => blackToken === token);
  }
}
