import { db } from '../../db/index.js';
import { communityNavigation, locationsNavigation, publicationsNavigation } from '../navigation.section.js';

export default {
  resource: db.table('countries'),

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
