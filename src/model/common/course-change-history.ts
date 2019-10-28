import { User } from '../entity';
import { Exclude } from 'class-transformer';
import { DatePeriodRange } from './date-period-range';
import { CourseChangeEvent  }from '../../util';

export class CourseChangeHistory {
  @Exclude()
  scID: string;

  @Exclude()
  personID: string;

  // 有動作的人
  person?: User;

  // 補課申請、停課
  event: CourseChangeEvent;

  eventTime: Date;

  // 教室補課申請或停課細部訊息
  detail?: {
    formID?: string;
    classroomID: string;
    timeRange: DatePeriodRange;
    progress?: number;
  };

  constructor(init?: Partial<CourseChangeHistory>) {
    Object.assign(this, init);
  }
}
