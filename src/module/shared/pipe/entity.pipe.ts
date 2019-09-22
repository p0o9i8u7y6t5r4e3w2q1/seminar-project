import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  NotFoundException,
} from '@nestjs/common';
import { findEntity } from '../../shared';

@Injectable()
export class EntityByIdPipe implements PipeTransform {
  constructor(private type: any, private relations?: string[]) {}

  async transform(id: any, metadata: ArgumentMetadata) {
    return findEntity(this.type, id, this.relations).then(data => {
      if (!data) {
        throw new NotFoundException(`${id} not exist in ${this.type.name}`);
      }
      return data;
    });
  }
}

export function EntityPipe(type: any, relations?: string[]) {
  return new EntityByIdPipe(type, relations);
}
