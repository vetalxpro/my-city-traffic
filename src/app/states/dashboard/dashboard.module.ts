import { IModule, module } from 'angular';

import { DashboardComponent, dashboardComponentSelector } from './dashboard.component';
import { navbarConfig } from './config';
import { dashboardRoutes } from './dashboard.routes';
import { TrafficMapComponent, DirectionsNavComponent } from './components';
import { trafficMapComponentSelector, directionsNavComponentSelector } from './components';

export const DashboardModule: IModule = module('app.states.dashboard', [])
  .component(dashboardComponentSelector, DashboardComponent)
  .component(trafficMapComponentSelector, TrafficMapComponent)
  .component(directionsNavComponentSelector, DirectionsNavComponent)
  .config(dashboardRoutes)
  .config(navbarConfig);
