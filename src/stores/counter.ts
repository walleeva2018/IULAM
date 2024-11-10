import { ref } from "vue";
import { defineStore } from "pinia";
import { getCurrentUser, useFirestore } from "vuefire";
import { collection, doc, getDoc, query } from "@firebase/firestore";
import { getDocs, setDoc, updateDoc, where , addDoc} from "firebase/firestore";

export interface Order {
  name: string;
  id: string;
  cost: number;
  amount: number;
  uid: string;
  is_item_enabled: boolean;
}

interface UserData {
  courseName: string;
  firstName: string;
  lastName: string;
  foreign: boolean;
  dateOfClass: string;  // or Date if you use Date objects
  month: string;        // consider using enum if only specific months are allowed
  className: string;
  kindOfClass: string;
  duration: number;     // assuming duration is in hours or minutes as a number
  amountToPayInU: number;
  amountInForeignCurrency: number;
  travelExpenses: number;
  idNum: string;
  birthDate: string;    // or Date if you use Date objects
  personsInCharge: string;
  accountType: string;  // consider enum if there are limited account types
  bankName: string;
  accountNumber: string;
}


export const useSnacksStore = defineStore("current-student", () => {
  const isUserDataFetching = ref(false);

// Updated getUser function
async function getUser() {
  isUserDataFetching.value = true;

  const db = useFirestore();
  const collectionRef = collection(db, "current-student");

  try {
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map((doc) => doc.data());
    
    // Set fetched data to courseData
     return data
  } catch (error) {
    console.error("Error fetching documents: ", error);
  } finally {
    isUserDataFetching.value = false;
  }
}


  async function setUser(userData: UserData) {
    console.log(userData);
    try {
      const db = useFirestore();
      const collectionRef = collection(db, "current-student");
      
  
      await addDoc(collectionRef, userData);
      console.log("Document added successfully");
  
      await getUser();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  

  async function updateSnakesOptions(payload: boolean) {
    isUserDataFetching.value = true;

    const db = useFirestore();
    const user = await getCurrentUser();

    const url = `/snacks-users/${user?.uid}`;

    const docRef = doc(db, url);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      snacks_enabled: payload,
    });

    await getUser();
  }

  return {
    getUser,
    setUser,
  };
});
