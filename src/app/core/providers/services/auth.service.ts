import { IPromise, IRootScopeService } from 'angular';
import { app as firebaseApp, auth, UserInfo } from 'firebase';
import { StorageService } from './storage.service';
import { User } from '../../models';
import { FirebaseRequestService } from './firebase-request.service';


export interface IAuthService {
  currentUser: User;
  status: boolean;
  getStatus(): boolean;
  getUser(): User;
  connect( data: any ): Promise<boolean>;
  authenticate( data?: any ): Promise<User>;
  signOut(): Promise<any>;
}

export class AuthService {
  static $inject = [
    'firebase',
    '$firebaseObject',
    '$firebaseArray',
    '$firebaseAuth',
    'StorageService',
    '$rootScope',
    'FirebaseRequestService'
  ];
  public currentUser: User;
  public status: boolean = false;
  private auth;
  private firebaseRef;
  private firebaseUserArrayRef;
  private firebaseMessagesArrayRef;

  constructor( private firebase: firebaseApp.App,
               private $firebaseObject,
               private $firebaseArray,
               private $firebaseAuth,
               private storageService: StorageService,
               private $rootScope: IRootScopeService,
               private firebaseRequestService: FirebaseRequestService<User> ) {
    this.init();
  }


  private init() {
    this.auth = this.$firebaseAuth(this.firebase.auth());
    this.firebaseRef = this.firebase.database().ref();
    this.firebaseUserArrayRef = this.$firebaseArray(this.firebaseRef.child('users'));
    this.registerListeners();
  }

  public authenticate(): IPromise<User> {
    return this.auth.$signInWithPopup(new auth.GoogleAuthProvider())
      .then(( result ) => {
        return this.createOrUpdateFirebaseUser(result.user);
      });
  }

  private createOrUpdateFirebaseUser( user: any ): IPromise<User> {
    const userRef = this.$firebaseObject(this.firebaseRef.child('users'));
    return this.getUserFromFirebase(user.uid)
      .then(( fbUser: User ) => {
        const preparedUser = this.transformFirebaseUser(user);
        if ( !fbUser ) {
          userRef[ preparedUser.providerId ] = preparedUser;
          userRef.$save();
        }
        return preparedUser;
      });
  }

  private getUserFromFirebase( uid: string ): IPromise<User> {
    return this.firebaseUserArrayRef.$loaded()
      .then(( data ) => {
        const record = data.$getRecord(uid);
        if ( record ) {
          this.firebaseRequestService.patch(`users/${uid}`, {
            lastLogin: new Date()
          });
        }
        return record;
      });
  }

  public logout(): IPromise<any> {
    return this.auth.$signOut()
      .then(() => {
        this.storageService.clearUser();
      });
  }

  private registerListeners() {
    this.auth.$onAuthStateChanged(( firebaseUser: UserInfo ) => {
      if ( firebaseUser ) {
        this.getUserFromFirebase(firebaseUser.uid)
          .then(( user: User ) => {
            this.currentUser = new User(user);
            // console.log(user, this.currentUser);
            this.storageService.saveUser(this.currentUser);
            this.firebaseMessagesArrayRef = this.$firebaseArray(this.firebaseRef.child('messages'));
            this.$rootScope.$broadcast('userAuthorized');
          });
      } else {
        this.currentUser = null;
        this.firebaseMessagesArrayRef = null;
        this.storageService.clearUser();
        this.$rootScope.$broadcast('userLogout');
      }
    });
  }

  public getMessages() {
    return this.firebaseMessagesArrayRef;
  }

  private transformFirebaseUser( user: UserInfo ) {
    return new User({
      id: user.uid,
      providerId: user.uid,
      username: user.displayName,
      email: user.email,
      image: user.photoURL
    });
  }

}
