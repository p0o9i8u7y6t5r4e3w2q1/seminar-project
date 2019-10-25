import { getManager, In } from 'typeorm';
import { PersonRepository } from '../../model/repository';

export function ArrayToObejct(arr: any[], keyField: string) {
  return Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));
}

export function uniqueArray(arr: any[], keyField: string) {
  const result: any[] = [];
  const unique: any = {};
  for (const item of arr) {
    const value = item[keyField];
    if (unique[value] === undefined) {
      result.push(value);
    }
    unique[value] = 0;
  }
  return result;
}

export function findEntities(
  type: any,
  ids: string | string[],
  relations?: string[],
) {
  return getManager().find(type, ids);
}

export async function checkIdExists(type: any, ids: string | string[]) {
  if (ids == null) return false;

  if (Array.isArray(ids)) {
    return (await getManager().count(type, { id: In(ids) })) === ids.length;
  } else {
    return (await getManager().count(type, { id: ids })) > 0;
  }
}
