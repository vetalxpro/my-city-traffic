import { mock } from 'angular';
import { AppModule } from '../../app.module';
import { topBarComponentSelector } from './top-bar.component';

describe('TopbarComponent', () => {
  beforeEach(mock.module(AppModule.name));

  let $ctrl;

  beforeEach(mock.inject(( $componentController, $rootScope ) => {
    const $scope = $rootScope.$new();
    $ctrl = $componentController(topBarComponentSelector, { $scope });
  }));

  it('should be defined', () => {
    expect($ctrl).toBeDefined();
  });

  it('should containt title', () => {
    const title = 'AngularJS + Typescript + Webpack';
    expect($ctrl.title).toEqual(title);
  });

});
