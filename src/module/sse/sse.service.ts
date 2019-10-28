import { Injectable, Inject } from '@nestjs/common';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { InformService } from '../shared';
import { RoleType } from '../../util';
import { SSE } from './sse';

const MF_COUNT = 'makeupCount';
const STAFF_BF_COUNT = 'staffBookingCount';
const DEPTHEAD_BF_COUNT = 'deptHeadBookingCount';

@Injectable()
export class SseService {
  constructor(
    @Inject(InformService)
    private readonly inform: InformService,
  ) {}

  findPendingFormsCount(roleID: RoleType, sse: SSE) {
    if (roleID == RoleType.Staff) {
      const mfCount$: Observable<number> = this.inform.asObservable(MF_COUNT);
      const bfCount$: Observable<number> = this.inform.asObservable(
        STAFF_BF_COUNT,
      );

      const source$ = combineLatest(mfCount$, bfCount$).pipe(
        map(([mfCount, bfCount]) => mfCount + bfCount),
      );
      sse.subscribe(source$);
    } else {
      // roleID == RoleType.DeptHead
      const bfCount$: Observable<number> = this.inform.asObservable(
        DEPTHEAD_BF_COUNT,
      );
      sse.subscribe(bfCount$);
    }
  }
}
