import { IModule, module } from 'angular';

import { SharedComponentModule } from './shared-components/shared-components.module';

export const SharedModule: IModule = module('app.shared', [
  SharedComponentModule.name
]);
