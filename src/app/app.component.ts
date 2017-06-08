import { IComponentOptions, IScope } from 'angular';
import './app.scss';

import { AppService } from './app.service';


export const appComponentSelector = 'app';

class AppController {
  static $inject = [ '$rootScope', 'AppService' ];
  leftSidenavId = 'leftSidenav';

  constructor( private $rootScope: IScope,
               private appService: AppService ) {
  }

  auth() {
    this.appService.auth();
  }

  findCoordinates() {
    this.appService.findCoordinates();
  }

  logout() {
    this.appService.logout();
  }

  getUser() {
    return this.appService.getUser();
  }
}


export const AppComponent: IComponentOptions = {
  controller: AppController,
  template: require('./app.html')
};
