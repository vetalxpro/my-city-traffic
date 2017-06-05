import { mock } from 'angular';

import { AppModule } from '../../app.module';

describe('Home Router', () => {

  beforeEach(mock.module(AppModule.name));

  const state = 'home';
  let $state;

  beforeEach(inject(( _$state_ ) => {
    $state = _$state_;
  }));


  it('Should check state changing', () => {
    expect($state.href(state)).toEqual('/home');
  });
});
