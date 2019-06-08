import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7pv2G_wvp1Nnb9_Ql48xDsC6nPYTGrvE",
    authDomain: "class-guide-system.firebaseapp.com",
    databaseURL: "https://class-guide-system.firebaseio.com",
    projectId: "class-guide-system",
    storageBucket: "class-guide-system.appspot.com",
    messagingSenderId: "252911290527",
    appId: "1:252911290527:web:c91326363afcce28"
  };

  let myApp  = firebase.initializeApp(firebaseConfig);

export default myApp;
