import { material } from 'angular';
import { coreConfig } from '../../../core.config';

export class ToastService {
  static $inject = [ '$mdToast' ];
  private toatPosition: string;

  constructor( private $mdToast: material.IToastService ) {
    this.toatPosition = coreConfig.toastPosition;
  }

  showSimple( data: string ) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .position(this.toatPosition)
        .textContent(data)
    );
  }
}
