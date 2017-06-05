import { ILocationProvider } from 'angular';

export function routesConfig( $locationProvider: ILocationProvider ) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

routesConfig.$inject = [ '$locationProvider' ];
