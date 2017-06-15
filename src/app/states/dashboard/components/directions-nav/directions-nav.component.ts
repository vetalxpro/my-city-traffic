import { IComponentOptions } from 'angular';

import { Contribution } from '../../../../core/models/contribution';
import './directions-nav.scss';


export const directionsNavComponentSelector = 'directionsNav';

interface IonSelectArgs {
  direction: Contribution;
}

class DirectionsNavController {
  static $inject = [];
  public directions: Contribution[] = [];
  public selectedDirection: Contribution;
  public onSelect: ( arg: IonSelectArgs ) => void;

  constructor() {

  }

  public selectDirection( direction: Contribution ) {
    this.onSelect({ direction: direction });
  }
}

export const DirectionsNavComponent: IComponentOptions = {
  controller: DirectionsNavController,
  template: require('./directions-nav.html'),
  bindings: {
    currentUser: '<',
    directions: '<',
    selectedDirection: '=',
    onSelect: '&'
  }
};
