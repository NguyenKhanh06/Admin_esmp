// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPXu4l00PUPCavCZDaSGNignSRlksh8Do",
    authDomain: "auth-swp.firebaseapp.com",
    projectId: "auth-swp",
    storageBucket: "auth-swp.appspot.com",
    messagingSenderId: "785459684149",
    appId: "1:785459684149:web:10861da9b15ba41261227c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app)
export { app, storage };