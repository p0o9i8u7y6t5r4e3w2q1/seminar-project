import { Controller, Inject, Get, Param, UseFilters } from '@nestjs/common';
import { UtilService } from './util.service';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('util')
@Controller('util')
export class UtilController {
  constructor(
    @Inject(UtilService)
    private readonly utilService: UtilService,
  ) {}

  @ApiOperation({ title: '查詢人物' })
  @Get('person/:id')
  async findPerson(@Param('id') id: string) {
    return await this.utilService.findPerson(id);
  }

  @ApiOperation({ title: '查詢申請', description: '查詢補課或借用申請' })
  @Get('form/:id')
  async findForm(@Param('id') formID: string) {
    return await this.utilService.findForm(formID);
  }

  @ApiOperation({ title: '查詢教室' })
  @Get('classroom/:id')
  async findClassroom(@Param('id') id: string) {
    return await this.utilService.findClassroom(id);
  }
}
