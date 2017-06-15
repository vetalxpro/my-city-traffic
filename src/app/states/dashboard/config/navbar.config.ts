import { NavbarProvider } from '../../../shared/shared-components/modules/nav-bar/providers';

export function navbarConfig( navbarServiceProvider: NavbarProvider ) {
  navbarServiceProvider.addMenuItem({
    title: 'Dashboard',
    sref: 'dashboard',
    name: 'dashboard',
    order: 1
  });
}
navbarConfig.$inject = [ 'NavbarServiceProvider' ];
