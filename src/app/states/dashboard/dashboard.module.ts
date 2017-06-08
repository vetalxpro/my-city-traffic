import { IModule, module } from 'angular';

import { DashboardComponent, dashboardComponentSelector } from './dashboard.component';
import { menuConfig } from './config';
import { dashboardRoutes } from './dashboard.routes';

export const DashboardModule: IModule = module('app.states.dashboard', [])
  .component(dashboardComponentSelector, DashboardComponent)
  .config(dashboardRoutes)
  .config(menuConfig);
