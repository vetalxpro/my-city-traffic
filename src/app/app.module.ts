import { IModule, module } from 'angular';

import { AppComponent, appComponentSelector } from './app.component';
import { appRoutes } from './app.routes';
import { routesConfig, materialConfig } from './config';
import { TopbarComponent, SidenavComponent } from './components';
import { topBarComponentSelector, sidenavComponentSelector } from './components';
import { StatesModule } from './states/states.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppService } from './app.service';

export const AppModule: IModule = module('app', [
  'ui.router',
  'ngAnimate',
  'ngMaterial',
  'firebase',
  SharedModule.name,
  CoreModule.name,
  StatesModule.name
]).component(appComponentSelector, AppComponent)
  .component(topBarComponentSelector, TopbarComponent)
  .component(sidenavComponentSelector, SidenavComponent)
  .service(AppService.name, AppService)
  .config(routesConfig)
  .config(appRoutes)
  .config(materialConfig);
