<script setup lang="ts">
import { ref, onMounted } from "vue";
import AdminAction from '../components/AdminAction.vue';
import { useSnacksStore } from '@/stores/counter'


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

const showModal = ref(false);
const courseData = ref([]); // Reactive array to store fetched data
const { getUser} = useSnacksStore()

// Fetch data on component mount
onMounted(async () => {
  const data = await getUser(); // Call getUser to fetch data
  if (data) {
    courseData.value = data; // Update courseData with fetched data
  }
});
</script>


<template>
  <div class="container max-w-5xl h-full mx-auto p-5">
    <!-- Include AdminAction component -->
    <AdminAction />
    <h1 class="text-2xl font-bold text-primary mb-4">Current Students</h1>

    <!-- Table Wrapper -->
    <div class="overflow-x-auto border rounded-md">
      <table class="table table-zebra w-full">
        <!-- Table Head -->
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Foreign</th>
            <th>Date of Class</th>
            <th>Month</th>
            <th>Name of Class</th>
            <th>Kind of Class</th>
            <th>Duration (hrs)</th>
            <th>Amount to Pay in $U</th>
            <th>Foreign Currency Amount</th>
            <th>Travel Expenses</th>
            <th>ID Num</th>
            <th>Birth Date</th>
            <th>Persons in Charge</th>
            <th>Account Type</th>
            <th>Bank Name</th>
            <th>Account Number</th>
          </tr>
        </thead>
        
        <!-- Table Body -->
        <tbody>
          <tr v-for="(entry, idx) in courseData" :key="idx">
            <td>{{ entry.courseName }}</td>
            <td>{{ entry.firstName }}</td>
            <td>{{ entry.lastName }}</td>
            <td>{{ entry.foreign }}</td>
            <td>{{ entry.dateOfClass }}</td>
            <td>{{ entry.month }}</td>
            <td>{{ entry.className }}</td>
            <td>{{ entry.kindOfClass }}</td>
            <td>{{ entry.duration }}</td>
            <td>{{ entry.amountToPayInU }}</td>
            <td>{{ entry.amountInForeignCurrency }}</td>
            <td>{{ entry.travelExpenses }}</td>
            <td>{{ entry.idNum }}</td>
            <td>{{ entry.birthDate }}</td>
            <td>{{ entry.personsInCharge }}</td>
            <td>{{ entry.accountType }}</td>
            <td>{{ entry.bankName }}</td>
            <td>{{ entry.accountNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
.table {
  width: 100%;
}
</style>
