import { Injectable, Inject } from '@nestjs/common';
import { SemesterCourseService } from '../semester-course.service';
import { User } from '../../../model/entity';
import { RoleType } from '../../../util';

@Injectable()
export class AccessAuthService {
  constructor(
    @Inject(SemesterCourseService)
    private readonly scService: SemesterCourseService,
  ) {}

  /**
   * 確認使用者是否有學期課程權限
   */
  async validateUser(user: Partial<User>, scID: string) {
    if (!user || !scID) return null;

    const sc = await this.scService.findOne(scID, ['TAs', 'teacher']);
    if (!sc) return null;

    switch (user.roleID) {
      case RoleType.Staff:
        return sc;
      case RoleType.DeptHead:
      case RoleType.Teacher:
        if (sc.teacherID === user.id) return sc;
        else return null;
      case RoleType.TA:
        if (sc.TAs.some(ta => ta.id === user.id)) return sc;
        else return null;
    }
    return null;
  }
}
