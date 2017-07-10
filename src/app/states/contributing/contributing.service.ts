import { IPromise } from 'angular';

import { MapDialogService } from '../../shared/dialogs/map-dialog/map-dialog.service';
import { AuthService, FirebaseRequestService, GeoService, StorageService } from '../../core/providers/services';
import { IContributionFormData } from './contributing.component';
import { Contribution } from '../../core/models';


export class ContributingService {
  static $inject = [ 'MapDialogService', 'AuthService', 'FirebaseRequestService', 'GeoService' ];

  constructor( private mapDialogService: MapDialogService,
               private authService: AuthService,
               private firebaseRequestService: FirebaseRequestService<Contribution>,
               private geoService: GeoService ) {
  }

  public showDialog(): IPromise<any> {
    return this.mapDialogService.show({
      zoom: 12,
      center: this.authService.currentUser.location.position
    });
  }

  public contribute( data: IContributionFormData ) {
    const preparedData = this.prepareData(data);
    this.firebaseRequestService.post(`contribution/${this.authService.currentUser.placeId}`, preparedData, { asArray: true });
  }

  private prepareData( data: IContributionFormData ) {
    return {
      userId: this.authService.currentUser.placeId,
      title: `${data.origin.formatted_address} - ${data.destination.formatted_address}`,
      origin: this.geoService.exportLatLng(data.origin),
      destination: this.geoService.exportLatLng(data.destination),
      additional: []
    };
  }
}
