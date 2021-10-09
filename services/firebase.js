import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAW8mgTeTll-P49Bd36859oS_U2uaEsFWg',
  authDomain: 'myexpensetracker-e2384.firebaseapp.com',
  projectId: 'myexpensetracker-e2384',
  storageBucket: 'myexpensetracker-e2384.appspot.com',
  messagingSenderId: '85256616410',
  appId: '1:85256616410:web:55a58b3cedaba3825c28e3',
  measurementId: 'G-NNF3GZG8TH',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = app.firestore();

export { auth, db };
