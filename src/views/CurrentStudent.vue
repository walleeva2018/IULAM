<script setup lang="ts">
import { ref, onMounted } from "vue";
import AdminAction from '../components/AdminAction.vue';
import { useSnacksStore } from '@/stores/counter';
import EditModal from '@/components/EditModal.vue'
import Loader from "@/components/Loader.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const showCourseName = ref(true);
const showFirstName = ref(true);
const showLastName = ref(true);
const showForeign = ref(true);
const showDateOfClass = ref(true);
const showMonth = ref(true);
const showClassName = ref(true);
const showKindOfClass = ref(true);
const showDuration = ref(true);
const showAmountToPayInU = ref(true);
const showAmountInForeignCurrency = ref(true);
const showTravelExpenses = ref(true);
const showIdNum = ref(true);
const showBirthDate = ref(true);
const showPersonsInCharge = ref(true);
const showAccountType = ref(true);
const showBankName = ref(true);
const showAccountNumber = ref(true);

interface UserData {
  id: string
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

const showModal = ref(false);
const isEditing = ref(false); // Track if editing mode is active
const currentUser = ref<UserData | null>(null); // Track current user for edit
const courseData = ref([]); // Reactive array to store fetched data
const isDataFetching = ref(false)

const { getUser, setUser, updateUser, deleteUser , isUserDataFetching } = useSnacksStore();

// Fetch data on component mount
onMounted(async () => {
  isDataFetching.value = true
  const data = await getUser();
  if (data) {
    courseData.value = data;
  }
  isDataFetching.value = false
  
});

// Open modal to edit a user
function editUser(user: UserData) {
  currentUser.value = { ...user };
  isEditing.value = true;
  showModal.value = true;
}

// Save changes after editing a user
async function saveUser() {
  if (currentUser.value) {
    await updateUser(currentUser.value.idNum, currentUser.value);
    await refreshData();
    resetModal();
  }
}

// Delete a user by id
async function removeUser(id: string) {
  await deleteUser(id);
  toast("User Updated Successfully", {
        autoClose: 2000,
      });
      isDataFetching.value = true
  await getUser()
  isDataFetching.value = false
 
}

// Refresh the data in courseData
async function refreshData() {
  isDataFetching.value = true
  const data = await getUser();
  if (data) {
    courseData.value = data;
  }
  isDataFetching.value = false
}

// Reset modal state
function resetModal() {
  currentUser.value = null;
  isEditing.value = false;
  showModal.value = false;
}

</script>

<template>
  <div class="container max-w-5xl h-full mx-auto p-5">
    <AdminAction :totalUser="courseData?.length"/>
    <h1 class="text-2xl font-bold text-primary mb-4 print:hidden">Current Students</h1>
    <div class="switches mb-4 print:hidden">
    
  <label>
    <input type="checkbox" v-model="showCourseName" /> Show Course Name
  </label>
  <label>
    <input type="checkbox" v-model="showFirstName" /> Show First Name
  </label>
  <label>
    <input type="checkbox" v-model="showLastName" /> Show Last Name
  </label>
  <label>
    <input type="checkbox" v-model="showForeign" /> Show Foreign
  </label>
  <label>
    <input type="checkbox" v-model="showDateOfClass" /> Show Date of Class
  </label>
  <label>
    <input type="checkbox" v-model="showMonth" /> Show Month
  </label>
  <label>
    <input type="checkbox" v-model="showClassName" /> Show Name of Class
  </label>
  <label>
    <input type="checkbox" v-model="showKindOfClass" /> Show Kind of Class
  </label>
  <label>
    <input type="checkbox" v-model="showDuration" /> Show Duration (hrs)
  </label>
  <label>
    <input type="checkbox" v-model="showAmountToPayInU" /> Show Amount to Pay in $U
  </label>
  <label>
    <input type="checkbox" v-model="showAmountInForeignCurrency" /> Show Foreign Currency Amount
  </label>
  <label>
    <input type="checkbox" v-model="showTravelExpenses" /> Show Travel Expenses
  </label>
  <label>
    <input type="checkbox" v-model="showIdNum" /> Show ID Num
  </label>
  <label>
    <input type="checkbox" v-model="showBirthDate" /> Show Birth Date
  </label>
  <label>
    <input type="checkbox" v-model="showPersonsInCharge" /> Show Persons in Charge
  </label>
  <label>
    <input type="checkbox" v-model="showAccountType" /> Show Account Type
  </label>
  <label>
    <input type="checkbox" v-model="showBankName" /> Show Bank Name
  </label>
  <label>
    <input type="checkbox" v-model="showAccountNumber" /> Show Account Number
  </label>
</div>

    <!-- Table Wrapper -->
     <div v-if="isUserDataFetching || isDataFetching">
      <Loader />
     </div>
     
    <div v-else class="overflow-x-auto border rounded-md">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th v-if="showCourseName">Course Name</th>
            <th v-if="showFirstName">First Name</th>
            <th v-if="showLastName">Last Name</th>
            <th v-if="showForeign">Foreign</th>
            <th v-if="showDateOfClass">Date of Class</th>
            <th v-if="showMonth">Month</th>
            <th v-if="showClassName">Name of Class</th>
            <th v-if="showKindOfClass">Kind of Class</th>
            <th v-if="showDuration">Duration (hrs)</th>
            <th v-if="showAmountToPayInU">Amount to Pay in $U</th>
            <th v-if="showAmountInForeignCurrency">Foreign Currency Amount</th>
            <th v-if="showTravelExpenses">Travel Expenses</th>
            <th v-if="showIdNum">ID Num</th>
            <th v-if="showBirthDate">Birth Date</th>
            <th v-if="showPersonsInCharge">Persons in Charge</th>
            <th v-if="showAccountType">Account Type</th>
            <th v-if="showBankName">Bank Name</th>
            <th v-if="showAccountNumber">Account Number</th>
            <th class="print:hidden" >Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, idx) in courseData" :key="idx">
            <td v-if="showCourseName">{{ entry.courseName }}</td>
            <td v-if="showFirstName">{{ entry.firstName }}</td>
            <td v-if="showLastName">{{ entry.lastName }}</td>
            <td v-if="showForeign">{{ entry.foreign }}</td>
            <td v-if="showDateOfClass">{{ entry.dateOfClass }}</td>
            <td v-if="showMonth">{{ entry.month }}</td>
            <td v-if="showClassName">{{ entry.className }}</td>
            <td v-if="showKindOfClass">{{ entry.kindOfClass }}</td>
            <td v-if="showDuration">{{ entry.duration }}</td>
            <td v-if="showAmountToPayInU">{{ entry.amountToPayInU }}</td>
            <td v-if="showAmountInForeignCurrency">{{ entry.amountInForeignCurrency }}</td>
            <td v-if="showTravelExpenses">{{ entry.travelExpenses }}</td>
            <td v-if="showIdNum">{{ entry.idNum }}</td>
            <td v-if="showBirthDate">{{ entry.birthDate }}</td>
            <td v-if="showPersonsInCharge">{{ entry.personsInCharge }}</td>
            <td v-if="showAccountType">{{ entry.accountType }}</td>
            <td v-if="showBankName">{{ entry.bankName }}</td>
            <td class="print:hidden">{{ entry.accountNumber }}</td>
            <!-- Add other fields -->
            <td class="flex print:hidden">
              <button class="btn btn-primary btn-sm" @click="editUser(entry)">Edit</button>
              <button style="background-color: red;" class="btn btn-sm" @click="removeUser(entry.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EditModal :show-modal="showModal" @close-modal="showModal = false" :user-data="currentUser" @save-user="refreshData" />
  </div>
</template>

<style scoped>
.table {
  width: 100%;
}
.modal {
  /* modal styles */
}
</style>
