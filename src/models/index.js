// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Survey } = initSchema(schema);

export {
  Survey
};