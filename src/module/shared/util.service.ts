import { Injectable, OnModuleInit } from '@nestjs/common';
import { getCustomRepository, getManager, EntityManager } from 'typeorm';
import { Classroom, BookingForm, MakeupCourseForm } from '../../model/entity';
import { PersonRepository } from '../../model/repository';

@Injectable()
export class UtilService implements OnModuleInit {
  private personRepository: PersonRepository;
  private manager: EntityManager;

  onModuleInit() {
    this.manager = getManager();
    this.personRepository = getCustomRepository(PersonRepository);
  }

  async findPerson(id: string) {
    return await this.personRepository.findByID(id);
  }

  async findForm(formID: string) {
    let type: any;
    switch (formID.slice(0, 2)) {
      case 'BF':
        type = BookingForm;
        break;
      case 'MF':
        type = MakeupCourseForm;
        break;
      default:
        return null;
    }

    return await this.manager.findOne(type, type.findID(formID));
  }

  async findClassroom(id: string) {
    return await this.manager.findOne(Classroom, id);
  }

  // async findNotice
}
