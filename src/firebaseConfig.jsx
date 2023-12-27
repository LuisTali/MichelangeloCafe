import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {

    /*apiKey: import.meta.env.REACT_APP_apiKey,
    authDomain: import.meta.env.REACT_APP_authDomain,
    projectId: import.meta.env.REACT_APP_projectId,
    storageBucket: import.meta.env.REACT_APP_storageBucket,
    messagingSenderId: "830320235386",
    appId: import.meta.env.REACT_APP_appId,
    measurementId: import.meta.env.REACT_APP_measurementId*/ 
    apiKey: "AIzaSyAGnCJcdDzEV0CX0Lkv5r_r9LN2bBVrgPU",
  authDomain: "michelangellocafe.firebaseapp.com",
  projectId: "michelangellocafe",
  storageBucket: "michelangellocafe.appspot.com",
  messagingSenderId: "830320235386",
  appId: "1:830320235386:web:3d185b4a827ffa11e3bcc3",
  measurementId: "G-VHLQCT3JQ4"
}


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);