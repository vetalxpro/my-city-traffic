import { google } from 'google-maps';

export class LocationWithBounds {
  position: google.maps.LatLng;
  bounds: google.maps.LatLngBounds;

  constructor( loc: any ) {
    this.position = loc.position ? new google.maps.LatLng(loc.position.lat, loc.position.lng) : null;
    this.bounds = loc.bounds ? new google.maps.LatLngBounds(loc.bounds.sw, loc.bounds.ne) : null;
  }
}
