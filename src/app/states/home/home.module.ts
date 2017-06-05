import { module } from 'angular';

import { homeRoutes } from './home.routes';
import { HomeComponent, homeComponentSelector } from './home.component';

export const HomeModule = module('HomeModule', [
  'ui.router'
])
  .component(homeComponentSelector, HomeComponent)
  .config(homeRoutes);
