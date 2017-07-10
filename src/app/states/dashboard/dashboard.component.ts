import { IComponentOptions, IOnInit } from 'angular';

import { AuthService, StorageService } from '../../core/providers/services';
import { Contribution } from '../../core/models/contribution';
import './dashboard.scss';
import { DashboardService } from './dashboard.service';


export const dashboardComponentSelector = 'dashboard';

class DashboardController implements IOnInit {
  static $inject = [ 'AuthService', 'StorageService', 'DashboardService' ];
  public selectedDirection: Contribution;
  public directions: Contribution[] = [];

  constructor( private authService: AuthService,
               private storageService: StorageService,
               private dashboardService: DashboardService ) {
  }

  public $onInit() {
    this.dashboardService.getDirections()
      .then(( directions ) => {
        this.directions = directions;
        console.log(this.directions);
      });
  }

  public getUserPosition() {
    if ( this.authService.currentUser ) {
      return this.authService.currentUser.location.position;
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
