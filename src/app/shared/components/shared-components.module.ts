import { IModule, module } from 'angular';

import { NavbarModule } from './nav-bar/nav-bar.module';
import { GooglemapsAutocompleteModule } from './googlemaps-autocomplete/googlemaps-autocomplete.module';

export const SharedComponentModule: IModule = module('app.shared.components', [
  NavbarModule.name,
  GooglemapsAutocompleteModule.name,
]);
