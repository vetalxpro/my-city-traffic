import { IComponentOptions, ui } from 'angular';

import { AuthService, ToastService } from '../../core/providers/services';
import { ContributingService } from './contributing.service';
import './contributing.scss';


export const contributingComponentSelector = 'contributing';

export interface IContributionFormData {
  title: string;
  origin: google.maps.GeocoderResult;
  destination: google.maps.GeocoderResult;
  additional?: google.maps.GeocoderResult[];
}

class ContributingController {
  static $inject = [ 'AuthService', 'ToastService', 'ContributingService', '$state' ];
  public contributionFormData: IContributionFormData;

  constructor( private authService: AuthService,
               private toastService: ToastService,
               private contributingService: ContributingService,
               private $state: ui.IStateService ) {
    this.contributionFormData = {
      title: '',
      origin: null,
      destination: null,
      additional: []
    };

  }

  public getUser() {
    return this.authService.currentUser;
  }

  public changePlace( type: string, position: any ) {
    console.log(type, position);
  }

  public submitForm() {
    this.contributingService.contribute(this.contributionFormData);
    this.$state.go('dashboard');
  }

  public handleError( error ) {
    this.toastService.showSimple(error);
  }

  public openDialog( pointType: string, additional: boolean = false ) {
    this.contributingService.showDialog()
      .then(( result: google.maps.GeocoderResult ) => {
        if ( additional ) {
          this.contributionFormData.additional[ pointType ] = result;
        } else {
          this.contributionFormData[ pointType ] = result;
        }
        console.log(this.contributionFormData);
      })
      .catch(( err ) => {
        console.log(err);
      });
  }

  public addAdditionalPoint() {
    this.contributionFormData.additional.push(null);
  }

  public removeAdditionalPoint( index: number ) {
    this.contributionFormData.additional.splice(index, 1);
  }
}

export const ContributingComponent: IComponentOptions = {
  controller: ContributingController,
  template: require('./contributing.html')
};
