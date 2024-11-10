<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSnacksStore } from '@/stores/counter'

const props = defineProps<{
  showModal: boolean
}>()

const emits = defineEmits(['closeModal'])

const my_modal_1 = ref<HTMLDialogElement | null>(null)
const isAdding = ref(false)

// Define all fields for the user data
const courseName = ref('')
const firstName = ref('')
const lastName = ref('')
const foreign = ref('')
const dateOfClass = ref('')
const month = ref('')
const className = ref('')
const kindOfClass = ref('')
const duration = ref(0)
const amountToPayInU = ref(0)
const amountInForeignCurrency = ref('')
const travelExpenses = ref(0)
const idNum = ref('')
const birthDate = ref('')
const personsInCharge = ref('')
const accountType = ref('')
const bankName = ref('')
const accountNumber = ref('')

const { setUser } = useSnacksStore()

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

    // Create a user object with all the data
    const userData = {
  courseName: courseName.value || "Default Course Name",
  firstName: firstName.value || "First Name",
  lastName: lastName.value || "Last Name",
  foreign: foreign.value || false,
  dateOfClass: dateOfClass.value || "YYYY-MM-DD",
  month: month.value || "January",
  className: className.value || "Default Class Name",
  kindOfClass: kindOfClass.value || "Default Kind",
  duration: duration.value || 0,
  amountToPayInU: amountToPayInU.value || 0,
  amountInForeignCurrency: amountInForeignCurrency.value || 0,
  travelExpenses: travelExpenses.value || 0,
  idNum: idNum.value || "ID123456",
  birthDate: birthDate.value || "YYYY-MM-DD",
  personsInCharge: personsInCharge.value || "Person Name",
  accountType: accountType.value || "Checking",
  bankName: bankName.value || "Default Bank",
  accountNumber: accountNumber.value || "0000000000",
};

    await setUser(userData)
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
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-xl py-3">User Information</h3>

      <div class="form-control w-full max-w-xs">
        <label class="label"> <span class="label-text">Course Name</span> </label>
        <input v-model="courseName" type="text" placeholder="Enter course name" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">First Name</span> </label>
        <input v-model="firstName" type="text" placeholder="Enter first name" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Last Name</span> </label>
        <input v-model="lastName" type="text" placeholder="Enter last name" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Foreign</span> </label>
        <input v-model="foreign" type="text" placeholder="Yes/No" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Date of Class</span> </label>
        <input v-model="dateOfClass" type="date" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Month</span> </label>
        <input v-model="month" type="text" placeholder="Enter month" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Class Name</span> </label>
        <input v-model="className" type="text" placeholder="Enter class name" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Kind of Class</span> </label>
        <input v-model="kindOfClass" type="text" placeholder="Online/Offline" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Duration</span> </label>
        <input v-model="duration" type="number" placeholder="Enter duration" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Amount to Pay (U)</span> </label>
        <input v-model="amountToPayInU" type="number" placeholder="Enter amount" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Amount in Foreign Currency</span> </label>
        <input v-model="amountInForeignCurrency" type="text" placeholder="e.g., 50 USD" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Travel Expenses</span> </label>
        <input v-model="travelExpenses" type="number" placeholder="Enter travel expenses" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">ID Number</span> </label>
        <input v-model="idNum" type="text" placeholder="Enter ID number" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Birth Date</span> </label>
        <input v-model="birthDate" type="date" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Persons in Charge</span> </label>
        <input v-model="personsInCharge" type="text" placeholder="Enter person's name" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Account Type</span> </label>
        <input v-model="accountType" type="text" placeholder="Checking/Savings" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Bank Name</span> </label>
        <input v-model="bankName" type="text" placeholder="Enter bank name" class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label"> <span class="label-text">Account Number</span> </label>
        <input v-model="accountNumber" type="text" placeholder="Enter account number" class="input input-bordered w-full max-w-xs" />
      </div>
      <!-- Continue with more input fields for all other fields in a similar way -->

      <div class="modal-action">
        <button class="btn btn-error" @click.prevent="emits('closeModal')">Close</button>
        <button class="btn btn-primary" @click.prevent="saveUserData" :disabled="isAdding">
          <span v-if="isAdding">Saving...</span>
          <span v-else>Add</span>
        </button>
      </div>
    </form>
  </dialog>
</template>
