import { IComponentOptions } from 'angular';

import { AuthService, ToastService } from '../../core/providers/services';
import { ContributingService } from './contributing.service';
import './contributing.scss';


export const contributingComponentSelector = 'contributing';

class ContributingController {
  static $inject = [ 'AuthService', 'ToastService', 'ContributingService' ];
  public origin: string;
  public destination: string;

  constructor( private authService: AuthService,
               private toastService: ToastService,
               private contributingService: ContributingService ) {

  }

  public getUser() {
    return this.authService.currentUser;
  }

  public changePlace( type: string, position: any ) {
    console.log(type, position);
  }

  public submitForm() {
    console.log(this.origin, this.destination);
  }

  public handleError( error ) {
    this.toastService.showSimple(error);
  }

  public openDialog() {
    this.contributingService.showDialog()
      .then(( result ) => {
        console.log(result);
      })
      .catch(( err ) => {
        console.log(err);
      });
  }
}

export const ContributingComponent: IComponentOptions = {
  controller: ContributingController,
  template: require('./contributing.html')
};
