import { IComponentOptions, IOnInit, ui } from 'angular';

import { NavbarService } from './services';
import { IMenuItem } from './models';
import './nav-bar.scss';


export const navBarComponentSelector = 'navBar';

class NavBarController implements IOnInit {
  static $inject = [ '$state', 'NavbarService' ];
  public list: boolean;
  public menuItems: IMenuItem[] = [];

  constructor( private $state: ui.IStateService,
               private navbarService: NavbarService ) {
  }

  public $onInit() {
    this.menuItems = this.navbarService.fetchMenuItems();
  }

  public navigate( item: IMenuItem ) {
    this.$state.go(item.sref);
  }

  public getActiveName(): string {
    const active = this.menuItems.find(( item ) => this.isActive(item));
    if ( active ) {
      return active.name;
    }
  }

  public isActive( item: IMenuItem ): boolean {
    return this.$state.is(item.sref);
  }
}

export const NavBarComponent: IComponentOptions = {
  controller: NavBarController,
  template: require('./nav-bar.html'),
  bindings: {
    list: '<'
  }
};
