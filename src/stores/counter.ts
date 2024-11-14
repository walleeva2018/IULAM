import { ref } from "vue";
import { defineStore } from "pinia";
import { getCurrentUser, useFirestore } from "vuefire";
import { collection, doc, getDocs, updateDoc, deleteDoc, addDoc } from "firebase/firestore";

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
  dateOfClass: string;  
  month: string;        
  className: string;
  kindOfClass: string;
  duration: number;     
  amountToPayInU: number;
  amountInForeignCurrency: number;
  travelExpenses: number;
  idNum: string;
  birthDate: string;    
  personsInCharge: string;
  accountType: string;  
  bankName: string;
  accountNumber: string;
}

export const useSnacksStore = defineStore("current-student", () => {
  const isUserDataFetching = ref(false);

  async function getUser() {
    isUserDataFetching.value = true;
    const db = useFirestore();
    const collectionRef = collection(db, "current-student");

    try {
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      isUserDataFetching.value = false;
    }
  }

  async function setUser(userData: UserData) {
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

  async function updateUser(userId: string, updatedData: Partial<UserData>) {
    isUserDataFetching.value = true;
    const db = useFirestore();
    const userDocRef = doc(db, "current-student", userId);

    try {
      await updateDoc(userDocRef, updatedData);
      console.log("Document updated successfully");
      await getUser();
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      isUserDataFetching.value = false;
    }
  }

  async function deleteUser(userId: string) {
    isUserDataFetching.value = true;
    const db = useFirestore();
    const userDocRef = doc(db, "current-student", userId);

    try {
      await deleteDoc(userDocRef);
      console.log("Document deleted successfully");
      await getUser();
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      isUserDataFetching.value = false;
    }
  }

  async function setPastuser(userData: UserData) {
    try {
      const db = useFirestore();
      const collectionRef = collection(db, "past-student");
      await addDoc(collectionRef, userData);
      console.log("Document added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }


  return {
    isUserDataFetching,
    getUser,
    setUser,
    updateUser,
    deleteUser,
    setPastuser
  };
});
