import { db } from '../../db/index.js';
import { challengesNavigation } from '../navigation.section.js';

export default {
  resource: db.table('users_green_challenges'),

  options: {
    parent: {
      name: 'Challenges',
    },
    listProperties: [],
    showProperties: [],
    navigation: challengesNavigation,
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
