import { IModule, module } from 'angular';

import { MapDialogService } from './map-dialog.service';


export const MapDialogModule: IModule = module('app.shared.components.map-dialog', [])
  .service(MapDialogService.name, MapDialogService);
