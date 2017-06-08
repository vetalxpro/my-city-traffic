import { IModule, module } from 'angular';

import { AuthService, FirebaseService, ToastService } from './services';

export const ProvidersModule: IModule = module('app.core.providers', [])
  .service(FirebaseService.name, FirebaseService)
  .service(AuthService.name, AuthService)
  .service(ToastService.name, ToastService);
