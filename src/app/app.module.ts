import { module } from 'angular';

import { AppComponent, appComponentSelector } from './app.component';
import { appRoutes } from './app.routes';
import { routesConfig, materialConfig } from './config';
import { TopbarComponent } from './components';
import { topBarComponentSelector } from './components';
import { StatesModule } from './states/states.module';

export const AppModule = module('AppModule', [
  'ui.router',
  'ngAnimate',
  'ngMaterial',
  StatesModule.name
]).component(appComponentSelector, AppComponent)
  .component(topBarComponentSelector, TopbarComponent)
  .config(routesConfig)
  .config(appRoutes)
  .config(materialConfig);
