import { db } from '../../db/index.js';
import { publicationsNavigation, subscriptionsNavigation } from '../navigation.section.js';

export default {
  resource: db.table('subscription_tiers'),

  options: {
    navigation: subscriptionsNavigation,
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
