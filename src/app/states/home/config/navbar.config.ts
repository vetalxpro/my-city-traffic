import { NavbarProvider } from '../../../shared/shared-components/modules/nav-bar/providers';

export function navbarConfig( navbarServiceProvider: NavbarProvider ) {
  navbarServiceProvider.addMenuItem({
    title: 'Home',
    sref: 'home',
    name: 'Home',
    order: 3
  });
}
navbarConfig.$inject = [ 'NavbarServiceProvider' ];
