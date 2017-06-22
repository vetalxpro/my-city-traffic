import { NavbarProvider } from '../../../shared/components/nav-bar/providers';


export function navbarConfig( navbarServiceProvider: NavbarProvider ) {
  navbarServiceProvider.addMenuItem({
    name: 'contributing',
    title: 'Contributing',
    order: 2,
    sref: 'contributing'
  });
}
navbarConfig.$inject = [ 'NavbarServiceProvider' ];
