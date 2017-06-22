export interface IPosition {
  lat: number;
  lng: number;
}

export class Position implements IPosition {
  constructor( public lat: number,
               public lng: number ) {
  }
}
