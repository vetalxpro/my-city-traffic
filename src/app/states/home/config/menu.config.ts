import { NavbarProvider } from '../../../shared/shared-components/modules/nav-bar/providers';

export function menuConfig( navbarServiceProvider: NavbarProvider ) {
  navbarServiceProvider.addMenuItem({
    title: 'Home',
    sref: 'home',
    name: 'Home',
    active: false,
    order: 2
  });
}
menuConfig.$inject = [ 'NavbarServiceProvider' ];
