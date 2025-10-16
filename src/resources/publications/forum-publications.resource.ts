import { db } from '../../db/index.js';
import { publicationsNavigation } from '../navigation.section.js';

export default {
  resource: db.table('forum_publications'),

  options: {
    parent: {
      name: 'Publications',
    },
    navigation: publicationsNavigation,
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
