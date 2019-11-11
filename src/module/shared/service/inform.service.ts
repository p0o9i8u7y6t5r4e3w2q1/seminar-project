import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class InformService {
  private subjects: { [x: string]: Subject<any> } = {};

  register(key: string, subject: Subject<any>) {
    this.subjects[key] = subject;
  }

  hasRegistered(key: string) {
    return this.subjects[key] != null;
  }

  asObservable(key: string): Observable<any> {
    return this.subjects[key] ? this.subjects[key].asObservable() : null;
  }

  next(key: string, value: any) {
    if (this.subjects[key]) {
      this.subjects[key].next(value);
    }
  }
}
