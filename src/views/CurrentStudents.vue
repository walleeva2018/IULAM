<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import AdminActionStudent from '../components/AdminActionStudent.vue';
import { useSnacksStore } from '@/stores/counter';
import EditModal from '@/components/EditModal.vue'
import Loader from "@/components/Loader.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ToggleUserModal from '../components/ToggleUserModal.vue'

const showCourseName = ref(true);
const showLastName = ref(true);
const showFirstName = ref(true);
const showEmail = ref(true);
const showId = ref(true);
const showMobilePhone = ref(true);
const showDateOfBirth = ref(true);
const showAddress = ref(true);
const showCountry = ref(true);
const showCity = ref(true);
const showOccupation = ref(true);
const showWorkplace = ref(true);
const showAttendanceMode = ref(true);
const showPreviousTraining = ref(true);
const showPaymentType = ref(true);
const showPaymentMethod = ref(true);
const showTrainingPrice = ref(true);
const showDiscounts = ref(true);
const showDiscountConcept = ref(true);
const showCommission = ref(true);
const showPaymentAmount = ref(true);
const showAmountConcept = ref(true);
const showPaymentDate = ref(true);
const showPaymentMonthYear = ref(true);
const showBalanceDue = ref(true);
const showPaymentReceipt = ref(true);
const isDeleting = ref(false);

interface UserData {
  id: string;
  courseName: string;
  lastName: string;
  firstName: string;
  email: string;
  idNumber: string;
  mobilePhone: string;
  dateOfBirth: string;
  address: string;
  country: string;
  city: string;
  occupation: string;
  workplace: string;
  attendanceMode: 'Online' | 'In-Person';
  previousTraining: boolean;
  paymentType: 'Cash' | 'Financed';
  paymentMethod: 'Bank' | 'PayPal' | 'MercadoPago' | 'WesternUnion';
  trainingPrice: number;
  discounts: number;
  discountConcept: string;
  commission: number;
  paymentAmount: number;
  amountConcept: string;
  paymentDate: string;
  paymentMonthYear: string;
  balanceDue: number;
  paymentReceipt: string;
}

const showModal = ref(false);
const isEditing = ref(false);
const currentUser = ref<UserData | null>(null);
const courseData = ref<UserData[]>([]);
const isDataFetching = ref(false);
const toggleUser = ref(false);
const filteredData = ref<UserData[]>([]);

const { getStudents, deleteUser, setPastuser } = useSnacksStore();

onMounted(async () => {
  isDataFetching.value = true;
  const data = await getStudents();
  if(data)
  {
    courseData.value = data;
    filteredData.value= data
  }

  isDataFetching.value = false;
});

function editUser(user: UserData) {
  currentUser.value = { ...user };
  isEditing.value = true;
  showModal.value = true;
}

async function removeUser(user: UserData) {
  isDeleting.value = true;
  await setPastuser(user);
  await deleteUser(user.id);
  toast("User Deleted Successfully", {
    autoClose: 2000,
  });
  await refreshData();
  isDeleting.value = false;
}

async function refreshData() {
  isDataFetching.value = true;
  const data = await getStudents();
  if(data)
  {
    courseData.value = data;
    filteredData.value= data
  }
  isDataFetching.value = false;
}

function applyFilter(filter: any) {
  filteredData.value = courseData.value.filter((user: UserData) => {
    if (filter.value.paymentDone && user.balanceDue > 0) {
      return false;
    }
    if (filter.value.inPersonOnly && user.attendanceMode !== 'In-Person') {
      return false;
    }
    return true;
  });
}

const columnToggles = computed(() => ({
  showCourseName: {
    ref: showCourseName,
    label: 'Course Name'
  },
  showLastName: {
    ref: showLastName,
    label: 'Last Name'
  },
  showFirstName: {
    ref: showFirstName,
    label: 'First Name'
  },
  showEmail: {
    ref: showEmail,
    label: 'Email'
  },
  showId: {
    ref: showId,
    label: 'ID'
  },
  showMobilePhone: {
    ref: showMobilePhone,
    label: 'Mobile Phone'
  },
  showDateOfBirth: {
    ref: showDateOfBirth,
    label: 'Date of Birth'
  },
  showAddress: {
    ref: showAddress,
    label: 'Address'
  },
  showCountry: {
    ref: showCountry,
    label: 'Country'
  },
  showCity: {
    ref: showCity,
    label: 'City'
  },
  showOccupation: {
    ref: showOccupation,
    label: 'Occupation'
  },
  showWorkplace: {
    ref: showWorkplace,
    label: 'Workplace'
  },
  showAttendanceMode: {
    ref: showAttendanceMode,
    label: 'Mode of Attendance'
  },
  showPreviousTraining: {
    ref: showPreviousTraining,
    label: 'Previous Training'
  },
  showPaymentType: {
    ref: showPaymentType,
    label: 'Payment Type'
  },
  showPaymentMethod: {
    ref: showPaymentMethod,
    label: 'Payment Method'
  },
  showTrainingPrice: {
    ref: showTrainingPrice,
    label: 'Training Price'
  },
  showDiscounts: {
    ref: showDiscounts,
    label: 'Discounts'
  },
  showDiscountConcept: {
    ref: showDiscountConcept,
    label: 'Discount Concept'
  },
  showCommission: {
    ref: showCommission,
    label: 'Commission'
  },
  showPaymentAmount: {
    ref: showPaymentAmount,
    label: 'Payment Amount'
  },
  showAmountConcept: {
    ref: showAmountConcept,
    label: 'Amount Concept'
  },
  showPaymentDate: {
    ref: showPaymentDate,
    label: 'Payment Date'
  },
  showPaymentMonthYear: {
    ref: showPaymentMonthYear,
    label: 'Month/Year'
  },
  showBalanceDue: {
    ref: showBalanceDue,
    label: 'Balance Due'
  },
  showPaymentReceipt: {
    ref: showPaymentReceipt,
    label: 'Payment Receipt'
  }
}));

// Function to toggle all columns
const toggleAll = (value: boolean) => {
  Object.values(columnToggles.value).forEach(column => {
    column.ref.value = value;
  });
};
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto p-5">
    <AdminActionStudent :totalUser="courseData?.length" />
    
    <div class="flex justify-between items-center mb-4 print:hidden">
      <h1 class="text-2xl font-bold text-primary">Student Registry</h1>
      <div class="flex gap-2">
        <button class="btn btn-primary" @click="toggleUser = !toggleUser">
          Filter & Analytics
        </button>
        <button class="btn btn-primary" @click="refreshData">
          Refresh Data
        </button>
      </div>
    </div>

    <div class="mb-6 print:hidden">
    <!-- Toggle all button -->
    <div class="mb-4 flex justify-end">
      <button class="btn btn-sm btn-outline" @click="toggleAll(true)">Show All</button>
      <button class="btn btn-sm btn-outline ml-2" @click="toggleAll(false)">Hide All</button>
    </div>
    
    <!-- Column toggles -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <div v-for="(column, key) in columnToggles" :key="key" class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text mr-2">{{ column.label }}</span>
          <input v-model="column.ref.value" type="checkbox" class="toggle toggle-primary toggle-sm" />
        </label>
      </div>
    </div>
  </div>

    <!-- Table -->
    <div v-if="isDataFetching">
      <Loader />
    </div>
    <div v-else class="overflow-x-auto border rounded-md">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th v-if="showCourseName">Course Name</th>
            <th v-if="showLastName">Last Name</th>
            <th v-if="showFirstName">First Name</th>
            <th v-if="showEmail">Email</th>
            <th v-if="showId">ID</th>
            <th v-if="showMobilePhone">Mobile Phone</th>
            <th v-if="showDateOfBirth">Date of Birth</th>
            <th v-if="showAddress">Address</th>
            <th v-if="showCountry">Country</th>
            <th v-if="showCity">City</th>
            <th v-if="showOccupation">Occupation</th>
            <th v-if="showWorkplace">Workplace</th>
            <th v-if="showAttendanceMode">Mode of Attendance</th>
            <th v-if="showPreviousTraining">Previous Training</th>
            <th v-if="showPaymentType">Payment Type</th>
            <th v-if="showPaymentMethod">Payment Method</th>
            <th v-if="showTrainingPrice">Training Price</th>
            <th v-if="showDiscounts">Discounts</th>
            <th v-if="showDiscountConcept">Discount Concept</th>
            <th v-if="showCommission">Commission</th>
            <th v-if="showPaymentAmount">Payment Amount</th>
            <th v-if="showAmountConcept">Amount Concept</th>
            <th v-if="showPaymentDate">Payment Date</th>
            <th v-if="showPaymentMonthYear">Month/Year</th>
            <th v-if="showBalanceDue">Balance Due</th>
            <th v-if="showPaymentReceipt">Payment Receipt</th>
            <th class="print:hidden">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, idx) in filteredData" :key="idx">
            <td v-if="showCourseName">{{ entry.courseName }}</td>
            <td v-if="showLastName">{{ entry.lastName }}</td>
            <td v-if="showFirstName">{{ entry.firstName }}</td>
            <td v-if="showEmail">{{ entry.email }}</td>
            <td v-if="showId">{{ entry.idNumber }}</td>
            <td v-if="showMobilePhone">{{ entry.mobilePhone }}</td>
            <td v-if="showDateOfBirth">{{ entry.dateOfBirth }}</td>
            <td v-if="showAddress">{{ entry.address }}</td>
            <td v-if="showCountry">{{ entry.country }}</td>
            <td v-if="showCity">{{ entry.city }}</td>
            <td v-if="showOccupation">{{ entry.occupation }}</td>
            <td v-if="showWorkplace">{{ entry.workplace }}</td>
            <td v-if="showAttendanceMode">{{ entry.attendanceMode }}</td>
            <td v-if="showPreviousTraining">{{ entry.previousTraining ? 'Yes' : 'No' }}</td>
            <td v-if="showPaymentType">{{ entry.paymentType }}</td>
            <td v-if="showPaymentMethod">{{ entry.paymentMethod }}</td>
            <td v-if="showTrainingPrice">{{ entry.trainingPrice }}</td>
            <td v-if="showDiscounts">{{ entry.discounts }}</td>
            <td v-if="showDiscountConcept">{{ entry.discountConcept }}</td>
            <td v-if="showCommission">{{ entry.commission }}</td>
            <td v-if="showPaymentAmount">{{ entry.paymentAmount }}</td>
            <td v-if="showAmountConcept">{{ entry.amountConcept }}</td>
            <td v-if="showPaymentDate">{{ entry.paymentDate }}</td>
            <td v-if="showPaymentMonthYear">{{ entry.paymentMonthYear }}</td>
            <td v-if="showBalanceDue">{{ entry.balanceDue }}</td>
            <td v-if="showPaymentReceipt">{{ entry.paymentReceipt }}</td>
            <td class="flex gap-2 print:hidden">
              <button class="btn btn-primary btn-sm" @click="editUser(entry)">Edit</button>
              <button class="btn btn-error btn-sm" @click="removeUser(entry)" :disabled="isDeleting">
                {{ isDeleting ? 'Deleting...' : 'Delete' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EditModal 
      :show-modal="showModal" 
      @close-modal="showModal = false" 
      :user-data="currentUser" 
      @save-user="refreshData" 
    />
    <ToggleUserModal 
      :show-modal="toggleUser" 
      @close-modal="toggleUser = false" 
      @filter="applyFilter" 
    />
  </div>
</template>

<style scoped>
.table {
  width: 100%;
}
.form-control {
  @apply flex items-center gap-2 p-2;
}
.toggle {
  @apply scale-75;
}
</style>