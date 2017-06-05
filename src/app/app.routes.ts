import { IUrlRouterProvider } from 'angular-ui-router';

export function appRoutes( $urlRouterProvider: IUrlRouterProvider ) {
  $urlRouterProvider.otherwise('/home');
}
appRoutes.$inject = [ '$urlRouterProvider' ];
