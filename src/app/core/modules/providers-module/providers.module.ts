import { IModule, module } from 'angular';

import { AuthService, ToastService, GeoService, StorageService } from './services';
import { firebaseConstant } from './constants';

export const ProvidersModule: IModule = module('app.core.providers', [])
  .constant('firebase', firebaseConstant)
  .service(AuthService.name, AuthService)
  .service(ToastService.name, ToastService)
  .service(GeoService.name, GeoService)
  .service(StorageService.name, StorageService);
