import { IModule, module } from 'angular';

import { MapDialogModule } from './map-dialog/map-dialog.module';


export const SharedDialogsModule: IModule = module('app.shared.dialogs-module', [
  MapDialogModule.name
]);
