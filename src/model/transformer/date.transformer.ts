import { ValueTransformer, FindOperator } from 'typeorm';

export const dateTransformer: ValueTransformer = {
  to: (entityValue: any) => {
    return entityValue
  },

  from: (databaseValue: string) => {
    return new Date(databaseValue);
  },
};
