import { IPromise } from 'angular';
import { Contribution } from '../../core/models';
import { AuthService, FirebaseRequestService, StorageService } from '../../core/providers/services';


export class DashboardService {
  static $inject = [ 'AuthService', 'FirebaseRequestService', 'StorageService' ];

  constructor( private authService: AuthService,
               private requestService: FirebaseRequestService<Contribution>,
               private storageService: StorageService ) {
  }

  public getDirections(): IPromise<Contribution[]> {
    const url = `contribution/${this.storageService.getUser().placeId}`;
    return this.requestService.get(url, { asArray: true })
      .then(( directions: Contribution[] ) => directions.map(( item ) => new Contribution(item)));
  }
}
