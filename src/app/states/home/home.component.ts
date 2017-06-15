import { IComponentOptions, IOnInit, IScope } from 'angular';
import './home.scss';
import { AuthService } from '../../core/modules/providers-module/services/auth.service';
import { ToastService } from '../../core/modules/providers-module/services/toast.service';

export const homeComponentSelector = 'home';

class HomeController implements IOnInit {
  static $inject = [ 'AuthService', 'ToastService', '$scope' ];
  public title = 'Home Component Works!';
  public messages: any[] = [];

  constructor( private authService: AuthService,
               private toastService: ToastService,
               private $scope: IScope ) {

  }

  public $onInit() {
    this.messages = this.authService.getMessages();
    this.$scope.$on('userAuthorized', () => {
      this.messages = this.authService.getMessages();
    });
  }

  public showTitleInToast( title: string ) {
    this.toastService.showSimple(title);
  }

  public isAuth(): boolean {
    return !!this.authService.currentUser;
  }
}

export const HomeComponent: IComponentOptions = {
  controller: HomeController,
  template: require('./home.html')
};
