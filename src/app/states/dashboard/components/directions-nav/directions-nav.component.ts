import { IComponentOptions } from 'angular';

import { Contribution } from '../../../../core/models';
import './directions-nav.scss';


export const directionsNavComponentSelector = 'directionsNav';

interface IOnSelectArgs {
  direction: Contribution;
}

class DirectionsNavController {
  static $inject = [];
  public directions: Contribution[] = [];
  public selectedDirection: Contribution;
  public onSelect: ( arg: IOnSelectArgs ) => void;

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
