import { IStateProvider } from 'angular-ui-router';

import { homeComponentSelector } from './home.component';

export function homeRoutes( $stateProvider: IStateProvider ) {
  $stateProvider.state('home', {
    url: '/home',
    component: homeComponentSelector
  });
}
