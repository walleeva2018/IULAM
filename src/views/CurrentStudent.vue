<script setup lang="ts">
import { ref } from "vue";
import AdminAction from '../components/AdminAction.vue'

// Dummy data
const courseData = ref([
  {
    courseName: "Computer Science",
    firstName: "Alice",
    lastName: "Johnson",
    foreign: "Yes",
    dateOfClass: "2024-09-30",
    month: "September",
    className: "Intro to Programming",
    kindOfClass: "Online",
    duration: 2,
    amountToPayInU: 2000,
    amountInForeignCurrency: "50 USD",
    travelExpenses: 100,
    idNum: "123456789",
    birthDate: "1990-05-15",
    personsInCharge: "Dr. Smith",
    accountType: "Checking",
    bankName: "Bank of Example",
    accountNumber: "00123456789",
  },
  {
    courseName: "Mathematics",
    firstName: "Bob",
    lastName: "Smith",
    foreign: "No",
    dateOfClass: "2024-10-01",
    month: "October",
    className: "Calculus I",
    kindOfClass: "In-person",
    duration: 1.5,
    amountToPayInU: 1500,
    amountInForeignCurrency: "30 EUR",
    travelExpenses: 50,
    idNum: "987654321",
    birthDate: "1988-03-20",
    personsInCharge: "Ms. Johnson",
    accountType: "Savings",
    bankName: "Example Credit Union",
    accountNumber: "00987654321",
  },
  // Add more entries as needed
]);
</script>

<template>
  <div class="container max-w-5xl h-full mx-auto p-5">
    <AdminAction />
    <h1 class="text-2xl font-bold text-primary mb-4">Current Students</h1>

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
