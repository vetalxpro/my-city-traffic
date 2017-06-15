import { IMenuItem } from '../models';

export class NavbarService {
  private menuItems: IMenuItem[] = [];

  constructor() {
  }

  registerMenuItems( menuItems: IMenuItem[] ) {
    this.menuItems = menuItems;
  }

  fetchMenuItems(): IMenuItem[] {
    return this.menuItems.sort(( prev, next ) => {
      return prev.order - next.order;
    });
  }
}
