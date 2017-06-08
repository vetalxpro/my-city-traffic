import { IComponentOptions, IOnInit } from 'angular';
import './home.scss';
import { AuthService } from '../../core/modules/providers-module/services/auth.service';
import { ToastService } from '../../core/modules/providers-module/services/toast.service';

export const homeComponentSelector = 'home';

class HomeController implements IOnInit {
  static $inject = [ 'AuthService', 'ToastService' ];
  public title = 'Home Component Works!';
  messages: any[] = [];

  constructor( private authService: AuthService, private toastService: ToastService ) {

  }

  $onInit() {
    this.messages = this.authService.getMessages();
  }

  showTitleInToast( title: string ) {
    this.toastService.showSimple(title);
  }
}

export const HomeComponent: IComponentOptions = {
  controller: HomeController,
  template: require('./home.html')
};
