import { IComponentOptions } from 'angular';

import './home.scss';

export const homeComponentSelector = 'home';

class HomeController {
  public title = 'Home Component Works!';
}

export const HomeComponent: IComponentOptions = {
  controller: HomeController,
  template: require('./home.html')
};
