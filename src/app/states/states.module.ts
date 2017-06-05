import { module } from 'angular';

import { HomeModule } from './home/home.module';

export const StatesModule = module('StatesModule', [
  HomeModule.name
]);
