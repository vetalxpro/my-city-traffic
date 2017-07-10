import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyACEb19rLswfKivCPgFiw7nucfR_iUCs4I',
  authDomain: 'city-traffic-b0b1f.firebaseapp.com',
  databaseURL: 'https://city-traffic-b0b1f.firebaseio.com',
  projectId: 'city-traffic-b0b1f',
  storageBucket: 'city-traffic-b0b1f.appspot.com',
  messagingSenderId: '479466230164'
};

export const firebaseConstant: firebase.app.App = firebase.initializeApp(firebaseConfig);
