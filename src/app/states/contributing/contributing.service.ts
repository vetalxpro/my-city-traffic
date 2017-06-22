import { IPromise } from 'angular';

import { MapDialogService } from '../../shared/dialogs/map-dialog/map-dialog.service';
import { AuthService, StorageService } from '../../core/providers/services';


export class ContributingService {
  static $inject = [ 'MapDialogService', 'AuthService' ];

  constructor( private mapDialogService: MapDialogService,
               private authService: AuthService ) {
  }

  public showDialog(): IPromise<any> {
    return this.mapDialogService.show({
      zoom: 12,
      center: this.authService.currentUser.location.position
    });
  }
}
