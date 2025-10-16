import { ComponentLoader } from 'adminjs';
const componentLoader = new ComponentLoader();

const Components = {
  DashboardComponent: componentLoader.add('Dashboard', '../components/Dashboard'),
};

export { componentLoader, Components };
