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

  get activeMenuItem(): IMenuItem {
    return this.menuItems.find(( item: IMenuItem ) => {
      return item.active;
    });
  }

  set activeMenuItem( menuItem: IMenuItem ) {
    this.deactivateAllMenuItems();
    const targetItem = this.menuItems.find(( item ) => {
      return item === menuItem;
    });
    if ( targetItem ) {
      targetItem.active = true;
    }
  }

  private deactivateAllMenuItems() {
    this.menuItems.forEach(( item ) => {
      item.active = false;
    });
  }
}
