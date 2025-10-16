import { db } from '../../db/index.js';
import { topicsNavigation } from '../navigation.section.js';

export default {
  resource: db.table('topics'),

  options: {
    parent: {
      name: 'Topics',
    },
    navigation: topicsNavigation,
    listProperties: [],
    showProperties: [],
    actions: {
      new: {},
      edit: {
        isAccessible: false,
      },
      delete: { isAccessible: false },
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
