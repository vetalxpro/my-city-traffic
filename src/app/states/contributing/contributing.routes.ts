import { IStateProvider } from 'angular-ui-router';

import { contributingComponentSelector } from './contributing.component';


export function contributingRoutes( $stateProvider: IStateProvider ) {
  $stateProvider.state('contributing', {
    url: '/contributing',
    component: contributingComponentSelector
  });
}
contributingRoutes.$inject = [ '$stateProvider' ];
