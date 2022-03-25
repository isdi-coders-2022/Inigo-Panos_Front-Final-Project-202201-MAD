// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCjgNMK9TTE2_hK6uH1AVyd15E1ImSUfD8',
  authDomain: 'proyecto-final-inigo.firebaseapp.com',
  projectId: 'proyecto-final-inigo',
  storageBucket: 'proyecto-final-inigo.appspot.com',
  messagingSenderId: '529349306435',
  appId: '1:529349306435:web:3a9633a728618820850cf6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
