import { NavbarProvider } from '../../../shared/shared-components/modules/nav-bar/providers/nav-bar.provider';

export function menuConfig( navbarServiceProvider: NavbarProvider ) {
  navbarServiceProvider.addMenuItem({
    title: 'Dashboard',
    sref: 'dashboard',
    name: 'dashboard',
    active: true,
    order: 1
  });
}
menuConfig.$inject = [ 'NavbarServiceProvider' ];
