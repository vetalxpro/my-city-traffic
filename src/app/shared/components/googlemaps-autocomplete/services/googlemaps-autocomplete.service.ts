import { IPromise, IQService } from 'angular';
import { GeoService } from '../../../../core/providers/services';


export interface ISearchOptions {
  input: string;
  location: google.maps.LatLng;
  radius: number;
  bounds?: google.maps.LatLngBounds;
}

export class GooglemapsAutocompleteService {
  static $inject = [ '$q', 'GeoService' ];
  private autocompleteService = new google.maps.places.AutocompleteService();
  private currentPlace: google.maps.GeocoderResult;

  constructor( private $q: IQService,
               private geoService: GeoService ) {
  }

  public search( options: ISearchOptions ): IPromise<google.maps.places.QueryAutocompletePrediction[]> {
    if ( options.bounds ) {
      options = Object.assign({}, options, { strictBounds: true });
    }

    return this.$q(( resolve, reject ) => {
      this.autocompleteService.getQueryPredictions(options, ( result, status ) => {
        if ( status !== google.maps.places.PlacesServiceStatus.OK ) {
          return reject(result);
        }
        return resolve(result);
      });
    });

  }

  public getLatLng( placeId: string ): IPromise<google.maps.GeocoderResult> {
    if ( this.currentPlace && this.currentPlace.place_id === placeId ) {
      return this.$q.resolve(this.currentPlace);
    }
    return this.geoService.geocode({ placeId })
      .then(( results ) => {
        this.currentPlace = results[ 0 ];
        return this.currentPlace;
      });
  }
}
