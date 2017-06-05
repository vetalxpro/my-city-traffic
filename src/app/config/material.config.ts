import { material } from 'angular';

export function materialConfig( $mdThemingProvider: material.IThemingProvider ) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');
}

materialConfig.$inject = [ '$mdThemingProvider' ];


