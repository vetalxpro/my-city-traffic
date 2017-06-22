import { IModule, module } from 'angular';

import { ProvidersModule } from './providers/providers.module';

export const CoreModule: IModule = module('app.core', [
  ProvidersModule.name
]);
