import { FirebaseService } from './firebase.service';
import { auth } from 'firebase';

export class AuthService {
  static $inject = [ 'FirebaseService', '$firebaseObject', '$firebaseArray', '$firebaseAuth' ];
  private firebase: firebase.app.App;
  private auth;
  private firebaseRef;
  private currentUser;
  private firebaseUserArrayRef;
  private firebaseMessagesArrayRef;

  constructor( private firebaseService: FirebaseService,
               private $firebaseObject,
               private $firebaseArray,
               private $firebaseAuth ) {
    this.firebase = firebaseService.firebase;
    this.setup();
  }

  private setup() {
    this.auth = this.$firebaseAuth(this.firebase.auth());
    this.firebaseRef = this.firebase.database().ref();
    this.firebaseMessagesArrayRef = this.$firebaseArray(this.firebaseRef.child('messages'));
    this.registerListeners();
  }

  authenticate() {
    return this.auth.$signInWithPopup(new auth.GoogleAuthProvider())
      .then(( result ) => {
        this.currentUser = result.user;
      });
  }

  logout() {
    this.auth.$signOut();
  }

  private registerListeners() {
    this.auth.$onAuthStateChanged(( firebaseUser ) => {
      console.log(firebaseUser);
      if ( firebaseUser ) {
        this.currentUser = firebaseUser;
      } else {
        this.currentUser = null;
      }
    });
  }

  getUser() {
    return this.currentUser;
  }

  addMessage() {
    this.firebaseMessagesArrayRef.$add({
      title: 'Title' + Date.now(),
      text: 'text'
    });
  }

  getMessages() {
    return this.firebaseMessagesArrayRef;
  }

}
