import { IModule, module } from 'angular';

import { NavBarComponent, navBarComponentSelector } from './nav-bar.component';
import { NavbarProvider } from './providers';
import { NavbarService } from './services';

export const NavbarModule: IModule = module('app.shared.components.nav-bar', [])
  .provider(NavbarService.name, NavbarProvider)
  .component(navBarComponentSelector, NavBarComponent);
