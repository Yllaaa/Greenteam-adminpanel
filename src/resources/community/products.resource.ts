import { db } from '../../db/index.js';
import { communityNavigation, publicationsNavigation } from '../navigation.section.js';

export default {
  resource: db.table('products'),

  options: {
    navigation: communityNavigation,

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
