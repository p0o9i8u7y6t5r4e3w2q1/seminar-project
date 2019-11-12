import { getManager, In, Repository } from 'typeorm';
import { PersonRepository } from '../../model/repository';

export type FieldFn = (item: any) => string;

export function arrayToObject(arr: any[], keyField: string | FieldFn) {
  if (typeof keyField === 'string') {
    return Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));
  } else {
    return Object.assign({}, ...arr.map(item => ({ [keyField(item)]: item })));
  }
}

export function uniqueArray(arr: any[], keyField: string) {
  const result: any[] = [];
  const unique: any = {};
  for (const item of arr) {
    const value = item[keyField];
    if (value && unique[value] === undefined) {
      result.push(value);
    }
    unique[value] = 0;
  }
  return result;
}

export function uniqueArrayFn(arr: any[], keyFieldFn: FieldFn) {
  const result: any[] = [];
  const unique: any = {};
  for (const item of arr) {
    const value = keyFieldFn(item);
    if (value && unique[value] === undefined) {
      result.push(value);
    }
    unique[value] = 0;
  }
  return result;
}

// 假設來源array的資料key是unique
// 將來源的array資料放到到目標array的property
export function mapArrayToObjects(
  sourceArr: any[],
  souKeyField: string,
  targetArr: any[],
  tarKeyField: string,
  tarObjField: string,
): void {
  const source = arrayToObject(sourceArr, souKeyField);

  for (const item of targetArr) {
    const souObj = source[item[tarKeyField]];
    item[tarObjField] = souObj;
  }
}

export function mapArrayToObjectsFn(
  sourceArr: any[],
  souKeyFieldFn: FieldFn,
  targetArr: any[],
  tarKeyFieldFn: FieldFn,
  tarObjFn: (sou, tar) => void,
): void {
  const source = arrayToObject(sourceArr, souKeyFieldFn);

  for (const item of targetArr) {
    const souObj = source[tarKeyFieldFn(item)];
    tarObjFn(souObj, item);
  }
}

export interface Source {
  repository: Repository<any>;
  dbField: string;
  findOptions?: any;
}

export interface Target {
  array: any[];
  keyField: string;
  targetField: string;
}

export async function findEntityAndMapToObj(
  source: Source,
  target: Target,
): Promise<any[]> {
  const entitys = await source.repository.find({
    where: {
      id: In(uniqueArray(target.array, target.keyField)),
    },
    ...source.findOptions,
  });

  mapArrayToObjects(
    entitys,
    source.dbField,
    target.array,
    target.keyField,
    target.targetField,
  );

  return target.array;
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

export function mapToArrayObject(souArray: any[], keyFieldFn: FieldFn) {
  const result: { [x: string]: any[] } = {};

  for (const item of souArray) {
    const key = keyFieldFn(item);
    if (result[key] === undefined) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
}

export function mapData(data: any | any[], mapFn: (item: any) => any) {
  if (Array.isArray(data)) {
    return data.map(mapFn);
  } else {
    return mapFn(data);
  }
}
