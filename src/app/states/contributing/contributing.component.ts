import { IComponentOptions } from 'angular';

import { AuthService, ToastService } from '../../core/modules/providers-module/services';
import './contributing.scss';


export const contributingComponentSelector = 'contributing';

class ContributingController {
  static $inject = [ 'AuthService', 'ToastService' ];
  public origin: string;

  constructor( private authService: AuthService,
               private toastService: ToastService ) {

  }

  public getUser() {
    return this.authService.currentUser;
  }

  public submitForm() {
    this.toastService.showSimple(`submitted ${this.origin}`);
  }
}

export const ContributingComponent: IComponentOptions = {
  controller: ContributingController,
  template: require('./contributing.html')
};
