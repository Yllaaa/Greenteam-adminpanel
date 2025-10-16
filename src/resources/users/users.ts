import { db } from '../../db/index.js';
import { usersNavigation } from '../navigation.section.js';

export default {
  resource: db.table('users'),

  options: {
    navigation: usersNavigation,
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
