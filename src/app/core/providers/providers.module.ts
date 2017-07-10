import { IModule, module } from 'angular';


import { firebaseConstant } from './constants';
import { AuthService, FirebaseRequestService, GeoService, StorageService, ToastService } from './services';


export const ProvidersModule: IModule = module('app.core.providers', [])
  .constant('firebase', firebaseConstant)
  .service(AuthService.name, AuthService)
  .service(ToastService.name, ToastService)
  .service(GeoService.name, GeoService)
  .service(StorageService.name, StorageService)
  .service(FirebaseRequestService.name, FirebaseRequestService);
