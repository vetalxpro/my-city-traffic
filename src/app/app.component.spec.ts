import { mock } from 'angular';

import { AppModule } from './app.module';
import { appComponentSelector } from './app.component';

describe('AppComponent', () => {
  beforeEach(mock.module(AppModule.name));

  let $ctrl;

  beforeEach(mock.inject(( $componentController, $rootScope ) => {
    const $scope = $rootScope.$new();
    $ctrl = $componentController(appComponentSelector, { $scope });
  }));

  it('should be defined', () => {
    expect($ctrl).toBeDefined();
  });
});
