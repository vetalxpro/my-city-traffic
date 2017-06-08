import { material } from 'angular';

export function materialConfig( $mdThemingProvider: material.IThemingProvider, $mdIconProvider: material.IIconProvider ) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');
  $mdIconProvider.icon('add', require('../assets/svg/functionality/add.svg'), 24);
  $mdIconProvider.icon('menu', require('../assets/svg/nav/menu.svg'), 24);
  $mdIconProvider.icon('auth', require('../assets/svg/user/auth.svg'), 24);
  $mdIconProvider.icon('logout', require('../assets/svg/user/logout.svg'), 24);
  $mdIconProvider.icon('coords', require('../assets/svg/user/coords.svg'), 24);
  $mdIconProvider.icon('settings', require('../assets/svg/user/settings.svg'), 24);
}

materialConfig.$inject = [ '$mdThemingProvider', '$mdIconProvider' ];


