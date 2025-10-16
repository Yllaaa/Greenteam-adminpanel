import { db } from '../../db/index.js';
import { locationsNavigation } from '../navigation.section.js';

export default {
  resource: db.table('cities'),

  options: {
    navigation: locationsNavigation,

    listProperties: [],
    showProperties: [],
    actions: {
      new: {},
      edit: {},
      delete: {},
      show: {
        before: async (request) => {
          return request;
        },
      },
      list: {
        before: async (request) => {
          request.query = {
            ...request.query,
          };
          return request;
        },
      },
    },
  },
};
