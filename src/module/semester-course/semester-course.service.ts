import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSemesterCourseDto, UpdateSemesterCourseDto } from './dto';
import { SemesterCourse, User } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';

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
  async findOne(scID: string, relations?: string[]) {
    return await this.scRepository.findOne(scID, { relations });
  }

  /**
   * 查詢所有學期課程
   */
  async findAll(year: number, semester: number): Promise<SemesterCourse[]> {
    console.log('find semester course params');
    console.log({ year, semester });
    const semesterCourse = await this.scRepository.find({ year, semester });
    return semesterCourse;
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
    console.log(`update semester course params(id:${scID})`);
    console.log(updateDto);
    return await this.scRepository.update(scID, updateDto);
  }

  /**
   * 刪除一個學期課程
   */
  async delete(scID: string) {
    console.log(`delete semester course params (id:${scID})`);
    return await this.scRepository.delete(scID);
  }
}
