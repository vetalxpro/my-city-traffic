import { IComponentOptions, IOnInit, ui } from 'angular';
import './nav-bar.scss';

import { NavbarService } from './services';
import { IMenuItem } from './models';

export const navBarComponentSelector = 'navBar';

class NavBarController implements IOnInit {
  static $inject = [ '$state', 'NavbarService' ];
  list: boolean;
  menuItems: IMenuItem[] = [];

  constructor( private $state: ui.IStateService,
               private navbarService: NavbarService ) {
  }

  $onInit() {
    this.menuItems = this.navbarService.fetchMenuItems();
    if ( this.navbarService.activeMenuItem ) {
      this.$state.go(this.navbarService.activeMenuItem.sref);
    } else {
      this.$state.go(this.menuItems[ 0 ].sref);
    }
  }

  navigate( item: IMenuItem ) {
    this.navbarService.activeMenuItem = item;
    this.$state.go(item.sref);
  }

  getActiveName(): string {
    if ( this.navbarService.activeMenuItem ) {
      return this.navbarService.activeMenuItem.name;
    } else {
      this.menuItems[ 0 ].active = true;
      return this.menuItems[ 0 ].name;
    }
  }
}

export const NavBarComponent: IComponentOptions = {
  controller: NavBarController,
  template: require('./nav-bar.html'),
  bindings: {
    list: '<'
  }
};
