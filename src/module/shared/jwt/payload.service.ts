import { Request } from 'express';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateUtil } from '../../../util';
import { jwtConstants } from './jwt.constants';

interface Payload {
  userID: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class PayloadService {
  private blacklist: Payload[] = [];

  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  makeTokenByUser(user: any) {
    const payload: Payload = { userID: user.id };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return this.isBlacklisted(payload) ? null : payload;
    } catch {
      return null;
    }
  }

  decodeToken(token: string) {
    return token ? this.jwtService.decode(token) : null;
  }

  isNeedChange(payload: any): boolean {
    const diff = DateUtil.diff(
      new Date(),
      new Date(payload.iat * 1000),
      jwtConstants.changeTime.unit,
      true,
    );

    return diff > jwtConstants.changeTime.time;
  }

  changeToken(payload: Payload) {
    return this.jwtService.sign({ userID: payload.userID });
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
      return black.userID === payload.userID && black.iat === payload.iat;
    });
  }
}
