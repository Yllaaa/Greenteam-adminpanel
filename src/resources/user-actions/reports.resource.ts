import { db } from '../../db/index.js';
import { actionsNavigation } from '../navigation.section.js';

export default {
  resource: db.table('user_reports'),

  options: {
    navigation: actionsNavigation,
    listProperties: [],
    showProperties: [],

    properties: {
      status: {
        availableValues: [
          { value: 'pending', label: 'Pending' },
          { value: 'resolved', label: 'Resolved' },
          { value: 'ignored', label: 'Ignored' },
        ],
      },
    },

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
