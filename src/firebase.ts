import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'

// Prod config
const firebaseConfig = {
  apiKey: "AIzaSyC2US5NnMyc6UMcV5kGrcxPJS46sUpliQc",
  authDomain: "test-58462.firebaseapp.com",
  databaseURL: "https://test-58462.firebaseio.com",
  projectId: "test-58462",
  storageBucket: "test-58462.appspot.com",
  messagingSenderId: "137468012672",
  appId: "1:137468012672:web:9eaf51c1d972012612de65"
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
