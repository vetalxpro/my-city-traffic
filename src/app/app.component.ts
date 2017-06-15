import { IComponentOptions, IScope } from 'angular';

import { AppService } from './app.service';
import './app.scss';


export const appComponentSelector = 'app';

class AppController {
  static $inject = [ '$rootScope', 'AppService' ];
  public leftSidenavId = 'leftSidenav';

  constructor( private $rootScope: IScope,
               private appService: AppService ) {
  }

  public auth() {
    this.appService.auth();
  }

  public findCoordinates() {
    this.appService.findCoordinates();
  }

  public logout() {
    this.appService.logout();
  }

  public getUser() {
    return this.appService.getUser();
  }
}


export const AppComponent: IComponentOptions = {
  controller: AppController,
  template: require('./app.html')
};
