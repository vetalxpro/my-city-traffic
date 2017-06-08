import { AuthService } from './core/modules/providers-module/services/auth.service';

export class AppService {
  static $inject = [ 'AuthService' ];

  constructor( private authService: AuthService ) {
  }

  findCoordinates() {
    console.log('find coordinates');
    this.authService.addMessage();
  }

  auth() {
    console.log('auth');
    this.authService.authenticate();
  }

  logout() {
    console.log('logout');
    this.authService.logout();
  }

  getUser(): string {
    return this.authService.getUser();
  }
}
