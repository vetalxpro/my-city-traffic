import { IModule, module } from 'angular';

import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ContributingModule } from './contributing/contributing.module';

export const StatesModule: IModule = module('app.states', [
  HomeModule.name,
  DashboardModule.name,
  ContributingModule.name
]);
