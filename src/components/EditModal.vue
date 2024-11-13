<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSnacksStore } from '@/stores/counter'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps<{
  showModal: boolean
  userData?: {
    id: string
    courseName: string
    firstName: string
    lastName: string
    foreign: boolean
    dateOfClass: string
    month: string
    className: string
    kindOfClass: string
    duration: number
    amountToPayInU: number
    amountInForeignCurrency: number
    travelExpenses: number
    idNum: string
    birthDate: string
    personsInCharge: string
    accountType: string
    bankName: string
    accountNumber: string
  }
}>()

const emits = defineEmits(['closeModal', 'saveUser'])

const my_modal_1 = ref<HTMLDialogElement | null>(null)
const isAdding = ref(false)

// Define all fields for the user data

const courseName = ref('')
const firstName = ref('')
const lastName = ref('')
const foreign = ref(false)
const dateOfClass = ref('')
const month = ref('')
const className = ref('')
const kindOfClass = ref('')
const duration = ref(0)
const amountToPayInU = ref(0)
const amountInForeignCurrency = ref(0)
const travelExpenses = ref(0)
const idNum = ref('')
const birthDate = ref('')
const personsInCharge = ref('')
const accountType = ref('')
const bankName = ref('')
const accountNumber = ref('')

// Watch for changes in props.userData and update all fields
watch(
  () => props.userData,
  (newData) => {
    if (newData) {
      courseName.value = newData.courseName || ''
      firstName.value = newData.firstName || ''
      lastName.value = newData.lastName || ''
      foreign.value = newData.foreign || false
      dateOfClass.value = newData.dateOfClass || ''
      month.value = newData.month || ''
      className.value = newData.className || ''
      kindOfClass.value = newData.kindOfClass || ''
      duration.value = newData.duration || 0
      amountToPayInU.value = newData.amountToPayInU || 0
      amountInForeignCurrency.value = newData.amountInForeignCurrency || 0
      travelExpenses.value = newData.travelExpenses || 0
      idNum.value = newData.idNum || ''
      birthDate.value = newData.birthDate || ''
      personsInCharge.value = newData.personsInCharge || ''
      accountType.value = newData.accountType || ''
      bankName.value = newData.bankName || ''
      accountNumber.value = newData.accountNumber || ''
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.showModal,
  (newVal) => {
    console.log(newVal)
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

    // Update user object with the modified data
    const updatedUserData = {
      courseName: courseName.value,
      firstName: firstName.value,
      lastName: lastName.value,
      foreign: foreign.value,
      dateOfClass: dateOfClass.value,
      month: month.value,
      className: className.value,
      kindOfClass: kindOfClass.value,
      duration: duration.value,
      amountToPayInU: amountToPayInU.value,
      amountInForeignCurrency: amountInForeignCurrency.value,
      travelExpenses: travelExpenses.value,
      idNum: idNum.value,
      birthDate: birthDate.value,
      personsInCharge: personsInCharge.value,
      accountType: accountType.value,
      bankName: bankName.value,
      accountNumber: accountNumber.value,
    }

    await useSnacksStore().updateUser(props.userData?.id as string,updatedUserData)
    toast("User Updated Successfully", {
        autoClose: 2000,
      });
    emits('saveUser')
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
      <h3 class="font-bold text-xl py-3">Edit User Information</h3>

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


      <div class="modal-action">
        <button class="btn btn-error" @click.prevent="emits('closeModal')">Close</button>
        <button class="btn btn-primary" @click.prevent="saveUserData" :disabled="isAdding">
          <span v-if="isAdding">Saving...</span>
          <span v-else>Update</span>
        </button>
      </div>
    </form>
  </dialog>
</template>
