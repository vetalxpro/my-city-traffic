import { IModule, module } from 'angular';

import { DashboardComponent, dashboardComponentSelector } from './dashboard.component';
import { navbarConfig } from './config';
import { dashboardRoutes } from './dashboard.routes';
import { TrafficMapComponent, DirectionsNavComponent } from './components';
import { trafficMapComponentSelector, directionsNavComponentSelector } from './components';
import { DashboardService } from './dashboard.service';

export const DashboardModule: IModule = module('app.states.dashboard', [])
  .component(dashboardComponentSelector, DashboardComponent)
  .component(trafficMapComponentSelector, TrafficMapComponent)
  .component(directionsNavComponentSelector, DirectionsNavComponent)
  .service('DashboardService', DashboardService)
  .config(dashboardRoutes)
  .config(navbarConfig);
