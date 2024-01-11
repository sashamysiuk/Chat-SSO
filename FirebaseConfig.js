import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDrvXycbaOQE8i5oLDaGDSYfABnpjsQ1II",
    authDomain: "chatapp-e00b1.firebaseapp.com",
    projectId: "chatapp-e00b1",
    storageBucket: "chatapp-e00b1.appspot.com",
    messagingSenderId: "1071173191697",
    appId: "1:1071173191697:web:bfe7c84a6c234f54fe89b0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db};