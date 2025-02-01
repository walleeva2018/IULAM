<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSnacksStore } from '@/stores/counter'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

interface StudentData {
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



const props = defineProps<{
  showModal: boolean
}>()

const emits = defineEmits(['closeModal'])

const my_modal_1 = ref<HTMLDialogElement | null>(null)
const isAdding = ref(false)

// Form fields
const courseName = ref('')
const lastName = ref('')
const firstName = ref('')
const email = ref('')
const idNumber = ref('')
const mobilePhone = ref('')
const dateOfBirth = ref('')
const address = ref('')
const country = ref('')
const city = ref('')
const occupation = ref('')
const workplace = ref('')
const attendanceMode = ref<'Online' | 'In-Person'>('Online')
const previousTraining = ref(false)
const paymentType = ref<'Cash' | 'Financed'>('Cash')
const paymentMethod = ref<'Bank' | 'PayPal' | 'MercadoPago' | 'WesternUnion'>('Bank')
const trainingPrice = ref(0)
const discounts = ref(0)
const discountConcept = ref('')
const commission = ref(0)
const paymentAmount = ref(0)
const amountConcept = ref('')
const paymentDate = ref('')
const paymentMonthYear = ref('')
const balanceDue = ref(0)
const paymentReceipt = ref('')

const { setUserStudent } = useSnacksStore()

watch(
  () => props.showModal,
  (newVal) => {
    if (newVal) {
      my_modal_1.value?.showModal()
    } else {
      my_modal_1.value?.close()
    }
  },
  { immediate: true }
)

async function saveUserData() {
  try {
    isAdding.value = true

    const userData = {
      courseName: courseName.value || "Default Course Name",
      lastName: lastName.value || "Last Name",
      firstName: firstName.value || "First Name",
      email: email.value || "email@example.com",
      idNumber: idNumber.value || "ID123456",
      mobilePhone: mobilePhone.value || "",
      dateOfBirth: dateOfBirth.value || "",
      address: address.value || "",
      country: country.value || "",
      city: city.value || "",
      occupation: occupation.value || "",
      workplace: workplace.value || "",
      attendanceMode: attendanceMode.value,
      previousTraining: previousTraining.value,
      paymentType: paymentType.value,
      paymentMethod: paymentMethod.value,
      trainingPrice: trainingPrice.value || 0,
      discounts: discounts.value || 0,
      discountConcept: discountConcept.value || "",
      commission: commission.value || 0,
      paymentAmount: paymentAmount.value || 0,
      amountConcept: amountConcept.value || "",
      paymentDate: paymentDate.value || "",
      paymentMonthYear: paymentMonthYear.value || "",
      balanceDue: balanceDue.value || 0,
      paymentReceipt: paymentReceipt.value || ""
    }

    await setUserStudent(userData)
    toast("User Created Successfully", {
      autoClose: 2000,
    })

    emits('closeModal')
  } catch (error) {
    console.error(error)
  } finally {
    isAdding.value = false
  }
}
</script>

<template>
  <dialog id="my_modal_1" ref="my_modal_1" class="modal">
    <form method="dialog" class="modal-box max-w-4xl">
      <h3 class="font-bold text-xl py-3">Student Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Basic Information -->
        <div class="space-y-4">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Course Name</span>
            </label>
            <input v-model="courseName" type="text" placeholder="Enter course name" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Last Name</span>
            </label>
            <input v-model="lastName" type="text" placeholder="Enter last name" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">First Name</span>
            </label>
            <input v-model="firstName" type="text" placeholder="Enter first name" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" type="email" placeholder="Enter email" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">ID Number</span>
            </label>
            <input v-model="idNumber" type="text" placeholder="Enter ID number" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Mobile Phone</span>
            </label>
            <input v-model="mobilePhone" type="tel" placeholder="Enter mobile number" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Date of Birth</span>
            </label>
            <input v-model="dateOfBirth" type="date" class="input input-bordered w-full" />
          </div>
        </div>

        <!-- Address and Work Information -->
        <div class="space-y-4">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Address</span>
            </label>
            <input v-model="address" type="text" placeholder="Enter address" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Country</span>
            </label>
            <input v-model="country" type="text" placeholder="Enter country" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">City</span>
            </label>
            <input v-model="city" type="text" placeholder="Enter city" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Occupation</span>
            </label>
            <input v-model="occupation" type="text" placeholder="Enter occupation" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Workplace</span>
            </label>
            <input v-model="workplace" type="text" placeholder="Enter workplace" class="input input-bordered w-full" />
          </div>
        </div>

        <!-- Training Information -->
        <div class="space-y-4">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Mode of Attendance</span>
            </label>
            <select v-model="attendanceMode" class="select select-bordered w-full">
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

          <div class="form-control w-full">
            <label class="label cursor-pointer">
              <span class="label-text">Previous Training with us</span>
              <input v-model="previousTraining" type="checkbox" class="checkbox" />
            </label>
          </div>
        </div>

        <!-- Payment Information -->
        <div class="space-y-4">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Payment Type</span>
            </label>
            <select v-model="paymentType" class="select select-bordered w-full">
              <option value="Cash">Cash</option>
              <option value="Financed">Financed</option>
            </select>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Payment Method</span>
            </label>
            <select v-model="paymentMethod" class="select select-bordered w-full">
              <option value="Bank">Bank</option>
              <option value="PayPal">PayPal</option>
              <option value="MercadoPago">MercadoPago</option>
              <option value="WesternUnion">Western Union</option>
            </select>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Training Price</span>
            </label>
            <input v-model="trainingPrice" type="number" placeholder="Enter price" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Discounts</span>
            </label>
            <input v-model="discounts" type="number" placeholder="Enter discount amount" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Discount Concept</span>
            </label>
            <input v-model="discountConcept" type="text" placeholder="Enter discount reason" class="input input-bordered w-full" />
          </div>
        </div>

        <!-- Payment Details -->
        <div class="space-y-4">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Commission</span>
            </label>
            <input v-model="commission" type="number" placeholder="Enter commission amount" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Payment Amount</span>
            </label>
            <input v-model="paymentAmount" type="number" placeholder="Enter payment amount" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Amount Concept</span>
            </label>
            <input v-model="amountConcept" type="text" placeholder="Enter amount concept" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Payment Date</span>
            </label>
            <input v-model="paymentDate" type="date" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Month/Year of Payment</span>
            </label>
            <input v-model="paymentMonthYear" type="month" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Balance Due</span>
            </label>
            <input v-model="balanceDue" type="number" placeholder="Enter balance due" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Payment Receipt</span>
            </label>
            <input v-model="paymentReceipt" type="text" placeholder="Enter receipt number" class="input input-bordered w-full" />
          </div>
        </div>
      </div>

      <div class="modal-action mt-6">
        <button class="btn btn-error" @click.prevent="emits('closeModal')">Close</button>
        <button class="btn btn-primary" @click.prevent="saveUserData" :disabled="isAdding">
          {{ isAdding ? 'Saving...' : 'Add' }}
        </button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
.modal-box {
  max-height: 90vh;
  overflow-y: auto;
}
</style>