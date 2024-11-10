import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'

// Prod config
const firebaseConfig = {
  apiKey: "AIzaSyCLFEeiHMnxh-j9ye_ZgMF-00XC8hOTrSM",
  authDomain: "abp2837.firebaseapp.com",
  projectId: "abp2837",
  storageBucket: "abp2837.firebasestorage.app",
  messagingSenderId: "593799105142",
  appId: "1:593799105142:web:da5390d90ee74bfe9b2d57",
  measurementId: "G-C8LMGS7HPL"
};

// Dev Config
// const firebaseConfig = {
//   apiKey: 'AIzaSyAnSbkQ4wAXYblFCRuR8fkku-GnbwEBW94',
//   authDomain: 'snacks-management-e1e18.firebaseapp.com',
//   projectId: 'snacks-management-e1e18',
//   storageBucket: 'snacks-management-e1e18.appspot.com',
//   messagingSenderId: '189923492402',
//   appId: '1:189923492402:web:04e225b1d04664e33db22b',
// }

export const firebaseApp = initializeApp(firebaseConfig)

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')
