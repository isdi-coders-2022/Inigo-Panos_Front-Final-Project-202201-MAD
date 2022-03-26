// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnZlIWgawcJ8juNfK3PEd6JllC4yXV8ew',
  authDomain: 'inig-panos-pfinal.firebaseapp.com',
  projectId: 'inig-panos-pfinal',
  storageBucket: 'inig-panos-pfinal.appspot.com',
  messagingSenderId: '144201555286',
  appId: '1:144201555286:web:2fc3d675b229774de88af7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
