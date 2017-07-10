import { Position } from './position';

interface IContribution {
  origin: Position;
  destination: Position;
  title: string;
  userId: string | number;
  additional: Position[];
}

export class Contribution {
  public origin: Position;
  public destination: Position;
  public title: string;
  public userId: string | number;
  public additional: Position[];

  constructor( contribution: IContribution ) {
    this.origin = contribution.origin;
    this.destination = contribution.destination;
    this.title = contribution.title;
    this.userId = contribution.userId;
    this.additional = contribution.additional;
  }

  private makePoint( location ) {
    return new google.maps.LatLng(location.lat, location.lng);
  }
}
