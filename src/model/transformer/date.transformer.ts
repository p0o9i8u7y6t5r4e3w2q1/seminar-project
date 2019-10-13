import { ValueTransformer } from 'typeorm';

export const dateTransformer: ValueTransformer = {
  to: (entityValue: Date) => {
    return entityValue;
  },

  from: (databaseValue: string) => {
    return new Date(databaseValue);
  },
};
