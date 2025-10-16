import { db } from '../../db/index.js';
import { actionsNavigation } from '../navigation.section.js';

export default {
  resource: db.table('user_blocks'),

  //   export const reportStatus = pgEnum('report_status', [
  //   'pending',
  //   'resolved',
  //   'ignored',
  // ]);
  options: {
    navigation: actionsNavigation,
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
