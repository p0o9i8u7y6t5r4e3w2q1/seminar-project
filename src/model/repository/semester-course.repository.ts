import {
  EntityRepository,
  Repository,
  DeepPartial,
  SaveOptions,
  InsertResult,
} from 'typeorm';
import { SemesterCourse, Schedule } from '../entity';
import { RoleType } from '../../util';

@EntityRepository(SemesterCourse)
export class SemesterCourseRepository extends Repository<SemesterCourse> {
  insert(data: SemesterCourse | SemesterCourse[]): Promise<InsertResult> {
    if (Array.isArray(data)) {
      for (const e of data) {
        (e as SemesterCourse).combineID();
        (e as SemesterCourse).generateSchedules();
      }
    } else {
      (data as SemesterCourse).combineID();
      (data as SemesterCourse).generateSchedules();
    }
    return super.insert(data);
  }

  preload(
    entityLike: DeepPartial<SemesterCourse>,
  ): Promise<SemesterCourse | undefined> {
    if (entityLike.id == null) {
      (entityLike as SemesterCourse).combineID();
    }
    return super.preload(entityLike);
  }

  /**
   * FIXME 因為無法使用save處理cascade的問題，所以請先刪除再呼叫此函式保存
   */
  save(
    data: Array<DeepPartial<SemesterCourse>>,
    options?: SaveOptions,
  ): Promise<Array<DeepPartial<SemesterCourse>>>;
  save(
    data: DeepPartial<SemesterCourse>,
    options?: SaveOptions,
  ): Promise<DeepPartial<SemesterCourse>>;
  async save(data: any, options?: any): Promise<any> {
    if (Array.isArray(data)) {
      await this.delete(data.map(e => e.id));
      for (const e of data) {
        (e as SemesterCourse).combineID();
        (e as SemesterCourse).generateSchedules();
      }
    } else {
      await this.delete(data.id);
      (data as SemesterCourse).combineID();
      (data as SemesterCourse).generateSchedules();
    }
    return super.save(data, options);
  }

  /**
   * 原先的update不支持cascade保存，所以遇到聯集實際上改用save, insert保存
   * 可能會花較長的時間
   * @param {string} scID 原學期課程id
   * @param partial 要更新的部份實體，假設沒有動到識別id
   */
  async update(scID: any, partial: DeepPartial<SemesterCourse>): Promise<any> {
    if (
      partial.year ||
      partial.semester ||
      partial.courseID ||
      partial.courseNo
    ) {
      const sc = await this.findOneOrFail(scID);
      console.log(await this.delete(scID));
      this.merge(sc, partial);
      console.log(sc);
      return this.save(sc);
    }
    if (partial.time) {
      const sc = await this.findOneOrFail(scID);
      console.log(await this.manager.delete(Schedule, { scID }));
      this.merge(sc, partial);
      console.log(sc);
      return this.save(sc);
    } else {
      return super.update(scID, partial);
    }
  }

  findByUser(
    year: number,
    semester: number,
    userID: string,
    roleType: RoleType,
  ) {
    switch (roleType) {
      case RoleType.Staff:
        return this.find({ year, semester });
      case RoleType.Teacher:
        return this.createQueryBuilder('sc')
          .innerJoinAndSelect('sc.teacher', 'teacher', 'teacher.id = :id', {
            id: userID,
          })
          .where('sc.year = :year', { year })
          .andWhere('sc.semester = :semester', { semester })
          .getMany();
      case RoleType.TA:
        return this.createQueryBuilder('sc')
          .innerJoinAndSelect('sc.TAs', 'ta', 'ta.id = :id', {
            id: userID,
          })
          .where('sc.year = :year', { year })
          .andWhere('sc.semester = :semester', { semester })
          .getMany();
    }
  }
}
