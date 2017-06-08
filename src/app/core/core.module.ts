import { IModule, module } from 'angular';

import { ProvidersModule } from './modules';

export const CoreModule: IModule = module('app.core', [
  ProvidersModule.name
]);
