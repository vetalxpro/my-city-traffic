import { app as firebaseApp } from 'firebase';
import { AuthService } from '../../core/providers/services';
import { IPromise } from 'angular';


export class DashboardService {
  static $inject = [ 'firebase', 'AuthService', '$firebaseObject' ];
  private firebaseRef;
  public firebaseContributionObjectRef;

  constructor( private firebase: firebaseApp.App,
               private authService: AuthService,
               private $firebaseObject ) {
    this.init();
  }

  private init() {
    this.firebaseRef = this.firebase.database().ref();
    this.firebaseContributionObjectRef = this.$firebaseObject(this.firebaseRef.child('contribution'));
  }

  public getContributionArrayRef(): IPromise<any> {
    return this.firebaseContributionObjectRef.$loaded();
  }

}
