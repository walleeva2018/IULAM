<script setup lang="ts">
import { ref, onMounted } from "vue";
import AdminAction from '../components/AdminAction.vue';
import { useSnacksStore } from '@/stores/counter';
import EditModal from '@/components/EditModal.vue'
import Loader from "@/components/Loader.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ToggleUserModal from '../components/ToggleUserModal.vue'

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
const isDeleting = ref(false)

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
const toggleUser=ref(false)
const filteredData = ref<UserData | null>(null)
const avgAge = ref(0)

const { getUser, setUser, updateUser, deleteUser , isUserDataFetching, setPastuser , getPastuser} = useSnacksStore();

// Fetch data on component mount
onMounted(async () => {
  isDataFetching.value = true
  const data = await getPastuser();
  if (data) {
    courseData.value = data;
    filteredData.value= data
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
async function removeUser(user: UserData) {
  isDeleting.value = true
  await setPastuser(user)
  await deleteUser(user.id);
  toast("User Deleted Successfully", {
        autoClose: 2000,
      });
      isDataFetching.value = true
  await getPastuser()
  isDataFetching.value = false
  isDeleting.value = false
 
}

// Refresh the data in courseData
async function refreshData() {
  avgAge.value = 0
  isDataFetching.value = true
  const data = await getPastuser();
  if (data) {
    courseData.value = data;
    filteredData.value = data;
  }
  isDataFetching.value = false
}

// Reset modal state
function resetModal() {
  currentUser.value = null;
  isEditing.value = false;
  showModal.value = false;
}





function calculateAverageAge(data: UserData[]): void {
  if (data.length === 0) {
    avgAge.value = 0;
    return;
  }

  const totalAge = data.value.reduce((sum, user) => {
    const birthDate = new Date(user.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    return sum + age;
  }, 0);
  console.log(totalAge)


  avgAge.value = totalAge / data.value.length;
  console.log("Average Age:", avgAge.value);
}

function applyFilter(filter: any){
  window.console.log(filter.value)
  filteredData.value = courseData.value.filter((user: UserData) => {
    if (filter.value.paymentDone && user.amountToPayInU > 0) {
      return false;
    }
    if (filter.value.courseCompleted && user.className !== 'Completed') {
      return false;
    }
    
    return true;
  });
  if (filter.value.averageAge) {
         calculateAverageAge(filteredData)
    }

}
</script>

<template>
  <div class="container max-w-5xl h-full mx-auto p-5">
   
    <div class="flex justify-between items-center mb-4 print:hidden">
  <h1 class="text-2xl font-bold text-primary">Past Students</h1>
  <button class="btn btn-primary" @click="toggleUser = !toggleUser">
    Filter & Analytics
  </button>
  <button class="btn btn-primary" @click="refreshData">
   Refresh Data
  </button>
</div>

    <div class="switches mb-4 print:hidden">
    
      <div class="switches mb-4 print:hidden flex flex-wrap gap-2">  
      <div class="form-control">
  <label class="cursor-pointer label">
    <span>Course Name</span>
    <input v-model="showCourseName" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>First Name</span>
    <input v-model="showFirstName" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Last Name</span>
    <input v-model="showLastName" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Foreign</span>
    <input v-model="showForeign" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Date of Class</span>
    <input v-model="showDateOfClass" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Month</span>
    <input v-model="showMonth" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Name of Class</span>
    <input v-model="showClassName" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Kind of Class</span>
    <input v-model="showKindOfClass" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Duration (hrs)</span>
    <input v-model="showDuration" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Amount to Pay in $U</span>
    <input v-model="showAmountToPayInU" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Foreign Currency Amount</span>
    <input v-model="showAmountInForeignCurrency" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Travel Expenses</span>
    <input v-model="showTravelExpenses" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>ID Num</span>
    <input v-model="showIdNum" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Birth Date</span>
    <input v-model="showBirthDate" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Persons in Charge</span>
    <input v-model="showPersonsInCharge" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Account Type</span>
    <input v-model="showAccountType" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Bank Name</span>
    <input v-model="showBankName" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
<div class="form-control">
  <label class="cursor-pointer label">
    <span>Account Number</span>
    <input v-model="showAccountNumber" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
</div>
</div>

<span v-if="avgAge!==0"> Average Age : {{ avgAge }}</span> <span v-if="filteredData?.length !== courseData?.length"> Total Filtered Student : {{ filteredData?.length }}</span>

    <!-- Table Wrapper -->
     <div v-if="isDataFetching">
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
          <tr v-for="(entry, idx) in filteredData" :key="idx">
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
          </tr>
        </tbody>
      </table>
    </div>

    <EditModal :show-modal="showModal" @close-modal="showModal = false" :user-data="currentUser" @save-user="refreshData" />
    <ToggleUserModal :show-modal="toggleUser" @close-modal="toggleUser = false" @filter="applyFilter" />
  </div>
</template>

<style scoped>
.table {
  width: 100%;
}
.modal {
  /* modal styles */
}
.inline-checkbox {
  display: inline-flex;
  align-items: center;
  padding: 0 4px;
}

.label-text {
  font-size: 0.875rem; /* Smaller font size */
}

.small-toggle {
  width: 1.25rem; /* Smaller toggle width */
  height: 0.75rem; /* Smaller toggle height */
}
</style>