import { IModule, module } from 'angular';

import { homeRoutes } from './home.routes';
import { navbarConfig } from './config';
import { HomeComponent, homeComponentSelector } from './home.component';

export const HomeModule: IModule = module('HomeModule', [
  'ui.router'
])
  .component(homeComponentSelector, HomeComponent)
  .config(homeRoutes)
  .config(navbarConfig);
