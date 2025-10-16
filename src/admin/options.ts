import { AdminJSOptions } from 'adminjs';
import topicsResource from '../resources/topics/topic.js';
import usersResource from '../resources/users/users.js';
import greenChallenges from '../resources/challenges/greenChallenges.js';
import usersGreenChallenges from '../resources/challenges/users-greenChallenges.js';
import postsResource from '../resources/publications/posts.resource.js';
import forumPublicationsResource from '../resources/publications/forum-publications.resource.js';
import reportsResource from '../resources/user-actions/reports.resource.js';
import blocksResource from '../resources/user-actions/blocks.resource.js';
import pagesResource from '../resources/community/pages.resource.js';
import groupsResource from '../resources/community/groups.resource.js';
import productsResource from '../resources/community/products.resource.js';
import event from '../resources/community/events.resource.js';
import citiesResource from '../resources/locations/cities.resource.js';
import countriesResource from '../resources/locations/countries.resource.js';
import subscriptionsTiersBenifitsResource from '../resources/subscriptions/subscriptions-tiers-benifits.resource.js';
import subscriptionsTiersResource from '../resources/subscriptions/subscriptions-tiers.resource.js';
import usersSubscriptionsResource from '../resources/subscriptions/users-subscriptions.resource.js';
import subscriptionsBenifitsResource from '../resources/subscriptions/subscriptions-benifits.resource.js';
import { componentLoader, Components } from './component-loader.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  resources: [
    topicsResource,
    usersResource,
    greenChallenges,
    usersGreenChallenges,
    postsResource,
    forumPublicationsResource,
    reportsResource,
    blocksResource,
    pagesResource,
    groupsResource,
    productsResource,
    citiesResource,
    countriesResource,
    subscriptionsTiersBenifitsResource,
    subscriptionsTiersResource,
    usersSubscriptionsResource,
    subscriptionsBenifitsResource,
    event,
  ],
  dashboard: {
    component: Components.DashboardComponent,
  },
  branding: {
    companyName: 'Greenteam',
    withMadeWithLove: false,
    logo: 'https://greenteam-bucket-2025.s3.us-east-2.amazonaws.com/admin-panel-assets/Frame+1618872786.png',
  },
  databases: [],
};

export default options;
