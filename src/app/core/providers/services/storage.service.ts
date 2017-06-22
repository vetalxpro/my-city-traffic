import { local } from 'angular';

import { User } from '../../models';


export class StorageService {
  static $inject = [ 'localStorageService' ];
  private user: User;

  constructor( private localStorageService: local.storage.ILocalStorageService ) {
    this.init();
  }

  private init() {
    this.user = this.localStorageService.get('user') as User;
  }

  public getUser(): User {
    return this.user;
  }

  public getToken(): string {
    return this.user.token;
  }

  public clearUser() {
    this.localStorageService.remove('user');
    this.localStorageService.remove('token');
    this.user = null;
  }

  public saveUser( user: User, remember: boolean ) {
    this.user = user;
    if ( remember ) {
      this.localStorageService.set('user', this.user);
      this.localStorageService.set('token', this.user.token);
    }
  }
}
