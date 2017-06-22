import { module, IModule } from 'angular';

import { GooglemapsAutocompleteComponent, googlemapsAutocompleteSelector } from './googlemaps-autocomplete.component';
import { GooglemapsAutocompleteService } from './services';

export const GooglemapsAutocompleteModule: IModule = module('app.shared.components.googlemaps-autocomplete', [])
  .service(GooglemapsAutocompleteService.name, GooglemapsAutocompleteService)
  .component(googlemapsAutocompleteSelector, GooglemapsAutocompleteComponent);
