import { mock } from 'angular';

import { HomeModule } from './home.module';
import { homeComponentSelector } from './home.component';

describe('HomeComponent', () => {
  beforeEach(mock.module(HomeModule.name));

  let $ctrl;

  beforeEach(mock.inject(( $componentController, $rootScope ) => {
    const $scope = $rootScope.$new();
    $ctrl = $componentController(homeComponentSelector, { $scope });
  }));

  it('should be defined', () => {
    expect($ctrl).toBeDefined();
  });

  it('should containt title', () => {
    const title = 'Home Component Works!';
    expect($ctrl.title).toEqual(title);
  });

});
