import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';
import { SemesterCourse } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';
import { UserService } from '../user/user.service';
import { DateUtil } from '../../util';

// XXX 待測試
@Injectable()
export class SemesterCourseService {
  constructor(
    @InjectRepository(SemesterCourseRepository)
    private readonly scRepository: SemesterCourseRepository,
    @Inject(UserService)
    private readonly userService: UserService,
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
  async findByUser(userID: string) {
    const user = await this.userService.findOne(userID);
    const { year, semester } = DateUtil.getYearAndSemester(new Date());
    return await this.scRepository.findByUser(
      year,
      semester,
      userID,
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
}
