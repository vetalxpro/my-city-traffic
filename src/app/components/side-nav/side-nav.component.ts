import { IComponentOptions } from 'angular';
import './side-nav.scss';

export const sidenavComponentSelector = 'sideNav';

class SidenavController {
  componentId: string;

  constructor() {
  }

  $onInit() {
  }
}

export const SidenavComponent: IComponentOptions = {
  controller: SidenavController,
  template: require('./side-nav.html'),
  bindings: {
    componentId: '@leftSidenavId'
  }
};
