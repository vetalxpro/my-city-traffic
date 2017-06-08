import * as firebase from 'firebase';
import { coreConfig } from '../../../core.config';

export class FirebaseService {

  private firebaseApp: firebase.app.App;

  constructor() {
    this.firebaseApp = firebase.initializeApp(coreConfig.firebaseConfig);
  }

  get firebase(): firebase.app.App {
    return this.firebaseApp;
  }

}
