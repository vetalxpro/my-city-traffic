import { IPromise, IRootScopeService } from 'angular';
import { app as firebaseApp, auth, UserInfo } from 'firebase';
import { StorageService } from './storage.service';
import { User } from '../../models';


export class AuthService {
  static $inject = [
    'firebase',
    '$firebaseObject',
    '$firebaseArray',
    '$firebaseAuth',
    'StorageService',
    '$rootScope'
  ];
  public currentUser: User;
  private auth;
  private firebaseRef;
  private firebaseUserArrayRef;
  private firebaseMessagesArrayRef;

  constructor( private firebase: firebaseApp.App,
               private $firebaseObject,
               private $firebaseArray,
               private $firebaseAuth,
               private storageService: StorageService,
               private $rootScope: IRootScopeService ) {
    this.init();
  }

  private init() {
    this.auth = this.$firebaseAuth(this.firebase.auth());
    this.firebaseRef = this.firebase.database().ref();
    this.registerListeners();
  }

  public authenticate(): IPromise<User> {
    return this.auth.$signInWithPopup(new auth.GoogleAuthProvider())
      .then(( data ) => {
        this.currentUser = this.transformFirebaseUser(data.user);
        return this.currentUser;
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
        this.currentUser = this.transformFirebaseUser(firebaseUser);
        this.storageService.saveUser(this.currentUser, true);
        this.firebaseMessagesArrayRef = this.$firebaseArray(this.firebaseRef.child('messages'));
        this.$rootScope.$broadcast('userAuthorized');
      } else {
        this.currentUser = null;
        this.firebaseMessagesArrayRef = null;
        this.storageService.clearUser();
      }
    });
  }

  public addMessage() {
    if ( this.currentUser ) {
      this.firebaseMessagesArrayRef.$add({
        title: 'Title' + Date.now(),
        text: 'text'
      });
    }
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
