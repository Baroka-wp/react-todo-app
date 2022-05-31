import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCtLr6BMMciywzfk3bOWgvGG2QBZUsZFZ8',
  authDomain: 'carry-up-30be1.firebaseapp.com',
  projectId: 'carry-up-30be1',
  storageBucket: 'carry-up-30be1.appspot.com',
  messagingSenderId: '620742568165',
  appId: '1:620742568165:web:2cde1c2393743149a64c0c',
});

export const auth = app.auth();
export const db = firebase.firestore();

export default app;
