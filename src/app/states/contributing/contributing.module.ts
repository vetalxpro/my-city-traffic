import { IModule, module } from 'angular';

import { ContributingComponent, contributingComponentSelector } from './contributing.component';
import { navbarConfig } from './config';
import { contributingRoutes } from './contributing.routes';
import { ContributingService } from './contributing.service';


export const ContributingModule: IModule = module('app.states.contributing', [])
  .service(ContributingService.name, ContributingService)
  .component(contributingComponentSelector, ContributingComponent)
  .config(navbarConfig)
  .config(contributingRoutes);
