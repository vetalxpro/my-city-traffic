import { IServiceProvider } from 'angular';

import { IMenuItem } from '../models';
import { NavbarService } from '../services';

export class NavbarProvider implements IServiceProvider {
  private menuItems: IMenuItem[] = [];

  constructor() {
  }

  addMenuItem( item: IMenuItem ) {
    this.menuItems.push(item);
  }

  $get(): NavbarService {
    const navbarService = new NavbarService();
    navbarService.registerMenuItems(this.menuItems);
    return navbarService;
  }
}
