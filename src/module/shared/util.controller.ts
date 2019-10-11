import { Controller, Inject, Get, Param } from '@nestjs/common';
import { UtilService } from './util.service';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

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
  @Get('forms/:id')
  async findForm(@Param('id') formID: string) {
    return await this.utilService.findForm(formID);
  }

  @ApiOperation({ title: '查詢教室' })
  @Get('classrooms/:id')
  async findClassroom(@Param('id') id: string) {
    return await this.utilService.findClassroom(id);
  }
}
