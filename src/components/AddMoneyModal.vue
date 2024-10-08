<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFirestore } from 'vuefire'
import { storeToRefs } from 'pinia'
import { doc, setDoc } from 'firebase/firestore'
import { useSnacksStore } from '@/stores/counter'

interface Props {
  showModal: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
})

const emits = defineEmits(['closeModal'])

const snacksStore = useSnacksStore()

const my_modal_3 = ref<HTMLDialogElement | null>(null)
const itemAmount = ref(0)
const itemId = ref('')
const isAdding = ref(false)

// Dummy data for users
const dummyUsers = [
  { id: '1', name: 'Alice', balance: 100, paymentDone: true },
  { id: '2', name: 'Bob', balance: 50, paymentDone: false },
  { id: '3', name: 'Charlie', balance: 75, paymentDone: true },
]

const snacksEnabledUsers = ref(dummyUsers) // Use dummy data

watch(() => props.showModal, (n) => {
  if (n) {
    my_modal_3.value?.showModal()
  } else {
    emits('closeModal')
    my_modal_3.value?.close()
  }
}, { immediate: true })

watch(itemId, (n) => {
  const selectedUser = snacksEnabledUsers.value?.find((usr) => usr.id === n)

  if (selectedUser) {
    itemAmount.value = selectedUser?.balance || 0
  }
})

async function addMoney() {
  if (itemId.value) {
    try {
      const selectedUser = snacksEnabledUsers.value.find((usr) => usr.id === itemId.value)

      if (!selectedUser?.paymentDone) {
        alert('Payment is not done for this user. Please complete the payment first.');
        return; // Stop the function if payment is not done
      }

      isAdding.value = true

      const db = useFirestore()

      const url = `/snacks-users/${itemId.value}`
      const docRef = doc(db, url)

      const payload = {
        balance: itemAmount.value,
      }

      await setDoc(docRef, payload, { merge: true })

      await snacksStore.getUser()
      await snacksStore.getSnacksEnableUser()
      await snacksStore.getAllUser()

      itemId.value = ''
      itemAmount.value = 0

      emits('closeModal')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      isAdding.value = false
    }
  }
}
</script>

<template>
  <div @keydown.esc="$emit('closeModal')">
    <dialog id="my_modal_3" ref="my_modal_3" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-xl py-3">
          Add Money
        </h3>
        <div class="flex space-x-3">
          <div>
            <div class="form-control min-w-[300px] w-full max-w-xs">
              <label class="label">
                <span class="label-text">Select User</span>
              </label>
              <select v-model="itemId" class="select select-bordered">
                <option v-for="item in snacksEnabledUsers" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Balance</span>
            </label>
            <input v-model="itemAmount" type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs">
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-error" :disabled="isAdding" @click.prevent="$emit('closeModal')">
            Close
          </button>
          <button class="btn btn-primary" :class="{ loading: isAdding }" :disabled="isAdding" @click.prevent="addMoney">
            Add
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

