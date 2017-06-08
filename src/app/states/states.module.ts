import { IModule, module } from 'angular';

import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';

export const StatesModule: IModule = module('app.states', [
  HomeModule.name,
  DashboardModule.name
]);
