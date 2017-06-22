import { material, IPromise } from 'angular';

import { MapDialogController } from './map-dialog.controller';


export interface IMapDialogLocals {
  zoom?: number;
  center?: google.maps.LatLng;
}

export class MapDialogService {
  static $inject = [ '$mdDialog' ];

  constructor( private $mdDialog: material.IDialogService ) {
  }

  public show( locals: IMapDialogLocals = {} ): IPromise<any> {
    return this.$mdDialog.show({
      controller: MapDialogController,
      controllerAs: 'mapDialog',
      template: require('./map-dialog.html'),
      openFrom: 'left',
      closeTo: 'right',
      fullscreen: false,
      escapeToClose: true,
      clickOutsideToClose: true,
      locals: {
        zoom: locals.zoom,
        center: locals.center
      }
    });
  }

}
