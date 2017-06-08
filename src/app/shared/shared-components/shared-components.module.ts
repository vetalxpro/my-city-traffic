import { IModule, module } from 'angular';

import { NavbarModule } from './modules';

export const SharedComponentModule: IModule = module('app.shared.components', [
  NavbarModule.name
]);
