import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

let apiKey = import.meta.env.VITE_APIKEY;
let authDomain = import.meta.env.VITE_AUTHDOMAIN;
let projectId = import.meta.env.VITE_PROJECTID;
let storageBucket = import.meta.env.VITE_STORAGEBUCKET
let messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID
let appId = import.meta.env.VITE_APPID
let measurementId = import.meta.env.VITE_MEASUREMENTID

const firebaseConfig = {
apiKey: apiKey,
authDomain: authDomain, 
projectId: projectId,
storageBucket: storageBucket,
messagingSenderId: messagingSenderId,
appId: appId,
measurementId: measurementId
}


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);