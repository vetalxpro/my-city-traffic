import * as firebase from 'firebase';
import { coreConfig } from '../../core.config';

export const firebaseConstant: firebase.app.App = firebase.initializeApp(coreConfig.firebaseConfig);
