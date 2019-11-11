import { Controller, Inject, Get, Param, Query } from '@nestjs/common';
import { UtilService } from './util.service';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { FindFormDto } from './dto/find-form.dto';

@ApiUseTags('util')
@Controller()
export class UtilController {
  constructor(
    @Inject(UtilService)
    private readonly utilService: UtilService,
  ) {}

  @ApiOperation({ title: '查詢人物' })
  @Get('persons/:id')
  async findPerson(@Param('id') id: string) {
    return await this.utilService.findPerson(id);
  }

  @ApiOperation({ title: '查詢申請', description: '查詢補課或借用申請' })
  @Get('forms/:formID')
  async findForm(@Param() dto: FindFormDto) {
    return await this.utilService.findForm(dto.formID);
  }

  @ApiOperation({ title: '查詢教室' })
  @Get('classrooms/:id')
  async findClassroom(@Param('id') id: string) {
    return await this.utilService.findClassroom(id);
  }

  @ApiOperation({ title: '查詢所有課程(非學期課程)' })
  @Get('courses')
  async findAllCourses() {
    return await this.utilService.findAllCourses();
  }

  @ApiOperation({ title: '查詢課程(非學期課程)' })
  @Get('courses/:id')
  async findCourse(@Param('id') id: string) {
    return await this.utilService.findCourse(id);
  }

  @ApiOperation({ title: '查詢學期' })
  @Get('semester')
  async findSemester(
    @Query('year') year: number,
    @Query('semester') semester: number,
  ) {
    return await this.utilService.findSemester(year, semester);
  }
}
