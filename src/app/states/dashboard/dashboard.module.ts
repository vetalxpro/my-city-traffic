import { IModule, module } from 'angular';

import { DashboardComponent, dashboardComponentSelector } from './dashboard.component';
import { menuConfig } from './config';
import { dashboardRoutes } from './dashboard.routes';
import {TrafficMapComponent} from './components';
import {trafficMapSelector} from './components';

export const DashboardModule: IModule = module('app.states.dashboard', [])
  .component(dashboardComponentSelector, DashboardComponent)
    .component(trafficMapSelector,TrafficMapComponent)
  .config(dashboardRoutes)
  .config(menuConfig);
