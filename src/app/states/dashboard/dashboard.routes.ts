import { IStateProvider } from 'angular-ui-router';

import { dashboardComponentSelector } from './dashboard.component';

export function dashboardRoutes( $stateProvider: IStateProvider ) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    component: dashboardComponentSelector
  });
}
dashboardRoutes.$inject = [ '$stateProvider' ];

