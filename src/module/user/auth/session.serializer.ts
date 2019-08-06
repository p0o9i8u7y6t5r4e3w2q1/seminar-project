import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * @link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
 */
@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: Error, payload: string) => void) {
    done(null, payload);
  }
}
