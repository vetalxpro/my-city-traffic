import { IComponentOptions } from 'angular';

import { AuthService, StorageService } from '../../core/modules/providers-module/services';
import { Contribution } from '../../core/models/contribution';
import './dashboard.scss';


export const dashboardComponentSelector = 'dashboard';

class DashboardController {
  static $inject = [ 'AuthService', 'StorageService' ];
  public selectedDirection: Contribution;
  public directions: Contribution[] = [
    new Contribution({
      title: 'test 1',
      origin: { lat: 46.479009353404926, lng: 30.73373794555664 },
      destination: { lat: 46.47179809582868, lng: 30.754680633544922 }
    }),
    new Contribution({
      title: 'test 2',
      origin: { lat: 46.494610770689384, lng: 30.72927474975586 },
      destination: { lat: 46.461038542001724, lng: 30.704383850097656 }
    }),
    new Contribution({
      title: 'test 3',
      origin: { lat: 46.48515590043431, lng: 30.7342529296875 },
      destination: { lat: 46.4419971984478, lng: 30.750560760498047 }
    })
  ];

  constructor( private authService: AuthService,
               private storageService: StorageService ) {
  }

  public getUserPosition() {
    if ( this.storageService.getUser() ) {
      return this.storageService.getUser().location.position;
    }
  }

  public getUser() {
    return this.authService.currentUser;
  }

  public onDirectionSelect( direction: Contribution ) {
    this.selectedDirection = direction;
  }


}

export const DashboardComponent: IComponentOptions = {
  controller: DashboardController,
  template: require('./dashboard.html')
};
