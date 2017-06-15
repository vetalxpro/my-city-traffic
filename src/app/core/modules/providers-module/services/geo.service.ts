import { IPromise, IQService } from 'angular';
import { google } from 'google-maps';


export class GeoService {
  static $inject = [ '$q' ];

  public currentPosition: Position;
  private geocoder = new google.maps.Geocoder();
  private geocoderErrors: google.maps.GeocoderStatus[];


  constructor( private $q: IQService ) {
    this.init();
  }

  private init() {
    this.geocoderErrors = [
      google.maps.GeocoderStatus.ERROR,
      google.maps.GeocoderStatus.INVALID_REQUEST,
      google.maps.GeocoderStatus.OVER_QUERY_LIMIT,
      google.maps.GeocoderStatus.REQUEST_DENIED,
      google.maps.GeocoderStatus.UNKNOWN_ERROR
    ];
  }

  public getCurrentCoordinates(): IPromise<Position> {
    return this.$q(( resolve, reject ) => {
      if ( this.currentPosition ) {
        resolve(this.currentPosition);
      } else {
        navigator.geolocation.getCurrentPosition(
          ( position ) => {
            resolve(position);
          }, ( err ) => {
            reject(err);
          }
        );
      }
    });
  }

  public askGeocoder( options: google.maps.GeocoderRequest, types?: string[] ): IPromise<google.maps.GeocoderResult[]> {
    return this.$q(( resolve, reject ) => {
      this.geocoder.geocode(options, ( results, status ) => {
        if ( this.geocoderErrors.indexOf(status) > -1 || !results.length ) {
          reject(results);
        } else {
          const chosenAddresses = this.chooseLocationByType(results, types);
          resolve(chosenAddresses);
        }
      });
    });
  }

  private chooseLocationByType( results: google.maps.GeocoderResult[], types: string[] ): google.maps.GeocoderResult[] {
    if ( types ) {
      return results
        .filter(( result ) =>
          types.every(( item ) => result.types.indexOf(item) > -1));
    }
    return results;
  }

  public getCity( position: Position ): IPromise<google.maps.GeocoderResult> {
    const options: google.maps.GeocoderRequest = {
      location: this.positionToLatLng(position)
    };
    return this.askGeocoder(options, [ 'route' ])
      .then(( data: google.maps.GeocoderResult[] ) => {
        if ( data.length ) {
          return data[ 0 ];
        } else {
          throw new Error('Location not found');
        }
      });
  }

  public positionToLatLng( position: Position ): google.maps.LatLng {
    return new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  }
}