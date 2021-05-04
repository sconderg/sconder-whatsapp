import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAlYvftlnIEV8Wb1M2FFKZETXONMx3Q8TA",
    authDomain: "sconder-whatsapp.firebaseapp.com",
    projectId: "sconder-whatsapp",
    storageBucket: "sconder-whatsapp.appspot.com",
    messagingSenderId: "649858980226",
    appId: "1:649858980226:web:7e467fdb0121622310d79b"
  };

const app = firebase.apps.length < 1 ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };