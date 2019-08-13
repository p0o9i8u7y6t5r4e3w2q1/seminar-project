import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';
import { SemesterCourse, User } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';
import { DateUtil, RoleType } from '../../util';

// XXX 待測試
@Injectable()
export class SemesterCourseService {
  constructor(
    @InjectRepository(SemesterCourseRepository)
    private readonly scRepository: SemesterCourseRepository,
  ) {}

  /**
   * 新增學期課程
   */
  async create(createSemesterCourseDto: CreateSemesterCourseDto) {
    try {
      console.log('create semester course params');
      console.log(createSemesterCourseDto);
      const semesterCourse = await this.scRepository.create(
        createSemesterCourseDto,
      );
      return await this.scRepository.insert(semesterCourse);
    } catch (err) {
      console.log('fail to create semester course');
      return err;
    }
  }

  /**
   * 查詢特定學期課程
   */
  async findOne(scID: string, relations: string[]) {
    if (relations && relations.length !== 0) {
      return await this.scRepository.findOneOrFail(scID);
    } else {
      return await this.scRepository.findOneOrFail(scID, { relations });
    }
  }

  /**
   * 查詢所偶學期課程
   */
  async findAll(year: number, semester: number): Promise<SemesterCourse[]> {
    try {
      console.log('find semester course params');
      console.log({ year, semester });
      const semesterCourse = await this.scRepository.find({ year, semester });
      return semesterCourse;
    } catch (err) {
      console.log('fail to find semester course.');
    }
  }

  /**
   * 針對user的角色類別，查詢所有當學期課程
   */
  async findByUser(user: Partial<User>, year: number, semester: number) {
    return await this.scRepository.findByUser(
      year,
      semester,
      user.id,
      user.roleID,
    );
  }

  /**
   * 更新學期課程
   */
  async update(scID: string, updateDto: UpdateSemesterCourseDto) {
    try {
      console.log(`update semester course params(id:${scID})`);
      console.log(updateDto);
      return await this.scRepository.update(scID, updateDto);
    } catch (err) {
      console.log('fail to update semester course.');
      return err;
    }
  }

  /**
   * 刪除一個學期課程
   */
  async delete(scID: string) {
    try {
      console.log(`delete semester course params (id:${scID})`);
      return await this.scRepository.delete(scID);
    } catch (err) {
      console.log('fail to delete semester course.');
      return err;
    }
  }

  /**
   * 確認使用者是否有學期課程權限
   * 假設userID, role 是與資料庫一致的
   */
  async validate(userID: string, role: RoleType, scID: string) {
    const sc = await this.findOne(scID, ['TAs', 'Teacher']);
    switch (role) {
      case RoleType.Staff:
        return sc;
      case RoleType.DeptHead:
        return sc;
      case RoleType.Teacher:
        if (sc.teacherID === userID) return sc;
        else return null;
      case RoleType.TA:
        if (sc.TAs.some(ta => ta.id === userID)) return sc;
        else return null;
    }
    return null;
  }
}
