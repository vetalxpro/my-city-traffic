import { IQService, material } from 'angular';

import { GeoService } from '../../../core/providers/services';
import { IPosition } from '../../../core/models';
import './map-dialog.scss';


export const mapDialogSelector = 'mapDialog';

export class MapDialogController {
  static $inject = [ '$q', 'NgMap', '$mdDialog', 'zoom', 'center', 'GeoService' ];
  public getPosition: ( event ) => void;
  public closeDialog: () => void;

  constructor( private $q: IQService,
               private ngMap,
               private $mdDialog: material.IDialogService,
               public zoom: number,
               public center: IPosition,
               private geoService: GeoService ) {
    this.init();
  }

  public init() {
    this.ngMap.getMap()
      .then(( map ) => {
        google.maps.event.trigger(map, 'resize');
        if ( this.center ) {
          map.setCenter(this.getCenter());
        }
      });

    this.getPosition = ( event ) => {   // TODO: полный пипец с этим материал! (должно быть переменной c функцией, а не методом!!!)
      this.geoService.geocode({ location: event.latLng })
        .then(( result ) => {
          if ( result && result.length ) {
            this.$mdDialog.hide(result[ 0 ]);
          }
        });

    };
    this.closeDialog = () => {
      this.$mdDialog.hide();
    };
  }

  getCenter(): google.maps.LatLng {
    return this.geoService.positionToLatLng(this.center);
  }
}
