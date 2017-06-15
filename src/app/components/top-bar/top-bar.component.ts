import { IComponentOptions, material } from 'angular';

import './top-bar.scss';


export const topBarComponentSelector = 'topBar';

class TopbarController {
  static $inject = [ '$mdSidenav' ];

  isLeftSidenavOpen: boolean = false;
  leftSidenavId: string;
  auth: () => void;
  logout: () => void;
  user;
  findCoordinates: () => void;

  constructor( private $mdSidenav: material.ISidenavService ) {
  }

  toggleLeftSideNav() {
    this.$mdSidenav(this.leftSidenavId).toggle();
    this.isLeftSidenavOpen = !this.isLeftSidenavOpen;
  }
}

export const TopbarComponent: IComponentOptions = {
  controller: TopbarController,
  template: require('./top-bar.html'),
  bindings: {
    leftSidenavId: '@',
    auth: '&',
    logout: '&',
    findCoordinates: '&',
    user: '<'
  }
};
