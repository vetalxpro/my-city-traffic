import { equals, ILogService, IPromise, IQService } from 'angular';

import { google } from 'google-maps';
import { IPosition } from '../../models';
import { ToastService } from './toast.service';


/**
 * interfaces for ngmap services
 */
export interface INavigatorGeolocation {
  getCurrentPosition( opts?: { timeout: number } ): IPromise<Position>;
}

export interface IGeocoderService {
  geocode( options: google.maps.GeocoderRequest ): IPromise<google.maps.GeocoderResult[]>;
}
/**
 *
 */

export class GeoService {
  static $inject = [ '$q', 'NavigatorGeolocation', 'GeoCoder', 'ToastService', '$log' ];

  public currentPosition: IPosition;
  public currentGeocodedPlace: google.maps.GeocoderResult;

  constructor( private $q: IQService,
               private navigatorGeolocation: INavigatorGeolocation,
               private geocoderService: IGeocoderService,
               private toastService: ToastService,
               private $log: ILogService ) {
  }

  public getCurrentCoordinates(): IPromise<IPosition> {
    return this.navigatorGeolocation.getCurrentPosition()
      .then(( position ) => {
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
  }

  public geocode( options: google.maps.GeocoderRequest, types?: string[] ): IPromise<google.maps.GeocoderResult[]> {
    return this.geocoderService.geocode(options)
      .then(( results ) => this.filterLocationByType(results, types))
      .catch(( err ) => {
        this.$log.error(err);
        this.toastService.showSimple(err.message || JSON.stringify(err) || 'geocode error');
      });
  }

  private filterLocationByType( results: google.maps.GeocoderResult[], types: string[] ): google.maps.GeocoderResult[] {
    if ( types ) {
      return results.filter(( result ) =>
        types.every(( item ) => result.types.indexOf(item) > -1));
    }
    return results;
  }

  public exportLatLng( location: google.maps.GeocoderResult ) {
    return {
      lat: location.geometry.location.lat(),
      lng: location.geometry.location.lng()
    };
  }

  public getPlace( position: IPosition ): IPromise<google.maps.GeocoderResult> {
    if ( this.currentPosition && equals(this.currentPosition, position) ) {
      return this.$q.resolve(this.currentGeocodedPlace);
    }
    const options: google.maps.GeocoderRequest = {
      location: this.positionToLatLng(position)
    };
    return this.geocode(options/*, [ 'route' ]*/)
      .then(( results ) => {
        if ( results.length ) {
          this.currentPosition = position;
          this.currentGeocodedPlace = results[ 0 ];
          return this.currentGeocodedPlace;
        } else {
          throw new Error('Location not found');
        }
      });
  }

  public positionToLatLng( position: IPosition ): google.maps.LatLng {
    return new google.maps.LatLng(position.lat, position.lng);
  }
}
