import { IComponentOptions, IPromise, IQService } from 'angular';

import { GooglemapsAutocompleteService } from './services';
import { ToastService } from '../../../core/providers/services';
import { IPosition } from '../../../core/models';
import './googlemaps-autocomplete.scss';


export const googlemapsAutocompleteSelector = 'googlemapsAutocomplete';

class GooglemapsAutocompleteController {
  static $inject = [ '$q', 'GooglemapsAutocompleteService', 'ToastService' ];

  public selectedItem: any;
  public searchText: string;
  public oldSearchText: string;
  public queryResults: any[] = [];
  public ngModel: any;
  public location: google.maps.LatLng;
  public radius: number;
  public currentLocation: google.maps.LatLng;
  public bounds: google.maps.LatLngBounds;
  public noCache: boolean = true;
  public required: boolean;
  public placeholder: string;
  public delay: number = 1000;
  public isDisabled: boolean;
  public onPlaceChanged: ( args: { position: IPosition } ) => void;

  constructor( private $q: IQService,
               private googleAutocompleteService: GooglemapsAutocompleteService,
               private toastService: ToastService ) {

  }

  public selectedItemChange() {
    // this.ngModel = this.selectedItem;
    // console.log(this.selectedItem);
    if ( this.selectedItem ) {
      this.googleAutocompleteService.getLatLng(this.selectedItem.place_id)
        .then(( position ) => {
          // console.log(position);
          this.ngModel = position;
          const pos = {
            lng: position.geometry.location.lng(),
            lat: position.geometry.location.lat()
          };
          this.onPlaceChanged({ position: pos });
        });
    }
  }

  public getResults(): IPromise<any[]> {
    let resuls;
    if ( this.searchText !== this.oldSearchText ) {
      resuls = this.searchTextChange();
    } else {
      resuls = this.$q.resolve(this.queryResults);
    }
    this.oldSearchText = this.searchText;
    return resuls;
  }

  public searchTextChange(): IPromise<any[]> {
    if ( !this.searchText ) {
      return this.$q.resolve([]);
    }
    const options = {
      input: this.searchText,
      location: this.location,
      radius: this.radius,
      bounds: this.bounds
    };
    return this.googleAutocompleteService.search(options)
      .then(( data ) => {
        if ( !data ) {
          return this.queryResults = [];
        }
        return this.queryResults = data;
      })
      .catch(( err ) => {
        console.log(err);
        return this.queryResults = [];
      });
  }

}

export const GooglemapsAutocompleteComponent: IComponentOptions = {
  controller: GooglemapsAutocompleteController,
  template: require('./googlemaps-autocomplete.html'),
  bindings: {
    placeholder: '@',
    ngModel: '=',
    onPlaceChanged: '&',
    required: '<'
  }
};
