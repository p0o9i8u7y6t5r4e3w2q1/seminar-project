import { Request } from 'express';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateUtil } from '../../../util';
import { jwtConstants } from './jwt.constants';

interface Payload {
  userID: string;
  generated: Date;
}

@Injectable()
export class PayloadService {
  private blacklist: Payload[] = [];

  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  makeTokenByUser(user: any) {
    const payload: Payload = { userID: user.id, generated: new Date() };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    const payload = this.jwtService.verify(token);
    return this.isBlacklisted(payload) ? null : payload;
  }

  decodeToken(token: string) {
    return token ? this.jwtService.decode(token) : null;
  }

  isNeedChange(payload: any): boolean {
    const diff = DateUtil.diff(
      new Date(),
      payload.generated,
      jwtConstants.changeTime.unit,
      true,
    );

    return diff > jwtConstants.changeTime.time;
  }

  changeToken(payload: Payload) {
    const newPayload: Payload = {
      userID: payload.userID,
      generated: new Date(),
    };
    return this.jwtService.sign(newPayload);
  }

  getToken(req: Request): string {
    if (req.headers.authorization) {
      const splits = req.headers.authorization.split(' ');
      return splits[0] === 'Bearer' ? splits[1] : null;
    }
    return null;
  }

  blacklisted(payload: Payload) {
    this.blacklist.push(payload);
  }

  isBlacklisted(payload: Payload) {
    if (payload == null) return false;

    return this.blacklist.some(black => {
      return (
        black.userID === payload.userID && black.generated === payload.generated
      );
    });
  }
}
