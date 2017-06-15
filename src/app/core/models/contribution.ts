import { Position } from './position';

interface IContribution {
  origin: Position;
  destination: Position;
  title: string;
}

export class Contribution {
  public origin: Position;
  public destination: Position;
  public title: string;

  constructor( contribution: IContribution ) {
    this.origin = contribution.origin;
    this.destination = contribution.destination;
    this.title = contribution.title;
  }

  private makePoint( location ) {
    return new google.maps.LatLng(location.lat, location.lng);
  }
}
