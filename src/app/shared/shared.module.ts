import { IModule, module } from 'angular';

import { SharedComponentModule } from './components/shared-components.module';
import { SharedDialogsModule } from './dialogs/shared-dialogs.module';


export const SharedModule: IModule = module('app.shared', [
  SharedComponentModule.name,
  SharedDialogsModule.name
]);
