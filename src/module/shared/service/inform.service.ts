import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class InformService {
  private observables: { [x: string]: Observable<any> } = {};

  register(key: string, subject: Observable<any>) {
    this.observables[key] = subject;
  }

  hasRegistered(key: string) {
    return this.observables[key] != null;
  }

  asObservable(key: string): Observable<any> {
    return this.observables[key] ? this.observables[key] : null;
  }

  unRegister(key: string) {
    delete this.observables[key];
  }
}
