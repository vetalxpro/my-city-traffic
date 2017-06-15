import { IModule, module } from 'angular';

import { ContributingComponent, contributingComponentSelector } from './contributing.component';
import { navbarConfig } from './config';
import { contributingRoutes } from './contributing.routes';


export const ContributingModule: IModule = module('app.states.contributing', [])
  .component(contributingComponentSelector, ContributingComponent)
  .config(navbarConfig)
  .config(contributingRoutes);
