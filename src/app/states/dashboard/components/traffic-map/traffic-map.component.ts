import { IComponentOptions, IOnChanges, IOnInit } from 'angular';

import { Contribution } from '../../../../core/models';
import { Position } from '../../../../core/models';
import './traffic-map.scss';


export const trafficMapComponentSelector = 'trafficMap';

class TrafficMapController implements IOnChanges, IOnInit {
  static $inject = [ 'NgMap' ];
  public center: Position;
  public direction: Contribution;

  constructor( private ngMap ) {
  }

  public $onChanges( changes ) {
    console.log(changes);
    if ( changes.center && changes.center.currentValue ) {
      this.backToCenter(changes.center.currentValue);
    }
    if ( changes.direction && changes.direction.currentValue ) {
      this.direction = changes.direction.currentValue;
    }
  }

  public $onInit() {
    this.getMap().then(( map ) => {
      google.maps.event.trigger(map, 'resize');
    });
  }

  private backToCenter( pos: google.maps.LatLng ) {
    if ( pos ) {
      this.getMap().then(( map ) => {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(pos);
      });
    }
  }

  private getMap() {
    return this.ngMap.getMap();
  }

  public getPoint( event ) {
    console.log({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }

}

export const TrafficMapComponent: IComponentOptions = {
  controller: TrafficMapController,
  template: require('./traffic-map.html'),
  bindings: {
    center: '<',
    direction: '<'
  }
};
