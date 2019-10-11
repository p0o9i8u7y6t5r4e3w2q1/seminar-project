import { ValueTransformer } from 'typeorm';
import { DateUtil } from '../../util';

export const dateTransformer: ValueTransformer = {
  to: (entityValue: Date) => {
    return DateUtil.toDateString(entityValue);
  },

  from: (databaseValue: string) => {
    return new Date(databaseValue);
  },
};
