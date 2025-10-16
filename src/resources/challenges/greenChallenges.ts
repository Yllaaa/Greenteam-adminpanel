import { db } from '../../db/index.js';
import { challengesNavigation } from '../navigation.section.js';

export default {
  resource: db.table('green_challenges'),

  options: {
    listProperties: [],
    editProperties: ['title', 'description', 'topic_id', 'expires_at'],
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
