import { Controller, Inject, Get, Param, UseFilters } from '@nestjs/common';
import { UtilService } from './util.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('util')
@Controller('util')
export class UtilController {
  constructor(
    @Inject(UtilService)
    private readonly utilService: UtilService,
  ) {}

  @Get('person/:id')
  async findPerson(@Param('id') id: string) {
    return await this.utilService.findPerson(id);
  }

  @Get('form/:id')
  async findForm(@Param('id') formID: string) {
    return await this.utilService.findForm(formID);
  }

  @Get('classroom/:id')
  async findClassroom(@Param('id') id: string) {
    return await this.utilService.findClassroom(id);
  }
}
