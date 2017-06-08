import { IModule, module } from 'angular';

import { homeRoutes } from './home.routes';
import { menuConfig } from './config';
import { HomeComponent, homeComponentSelector } from './home.component';

export const HomeModule: IModule = module('HomeModule', [
  'ui.router'
])
  .component(homeComponentSelector, HomeComponent)
  .config(homeRoutes)
  .config(menuConfig);
