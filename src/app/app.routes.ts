import { IUrlRouterProvider } from 'angular-ui-router';

export function appRoutes( $urlRouterProvider: IUrlRouterProvider ) {
  $urlRouterProvider.otherwise('/dashboard');
}
appRoutes.$inject = [ '$urlRouterProvider' ];
