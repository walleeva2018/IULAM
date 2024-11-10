<script setup>
import { ref, watch } from 'vue'
import { useSnacksStore } from '@/stores/snacksStore'
import { getCurrentUser, useFirestore } from 'vuefire'



const props = withDefaults(defineProps(), {
  showModal: false,
  updatedUser: undefined,
})

const emits = defineEmits(['closeModal'])

const { setUser } = useSnacksStore()

const my_modal_1 = ref<HTMLDialogElement | null>(null)
const name = ref('')
const payment = ref(false)
const balance = ref(0)
const isAdding = ref(false)

watch(() => props.showModal, (n) => {
  if (n) {
    my_modal_1.value?.showModal()
    if (props.updatedUser) {
      name.value = props.updatedUser.name
      payment.value = props.updatedUser.payment
      balance.value = props.updatedUser.balance
    }
  } else {
    emits('closeModal')
    my_modal_1.value?.close()
  }
}, { immediate: true })

async function saveUserData() {
  try {
    isAdding.value = true
    await setUser(name.value, payment.value, balance.value)
    emits('closeModal')
  } catch (error) {
    console.error(error)
  } finally {
    isAdding.value = false
  }
}
</script>

<template>
  <div @keydown.esc="$emit('closeModal')">
    <dialog id="my_modal_1" ref="my_modal_1" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-xl py-3">User Information</h3>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input v-model="name" type="text" placeholder="Enter name" class="input input-bordered w-full max-w-xs">
        </div>
        <div class="form-control w-full max-w-xs mt-4">
          <label class="label cursor-pointer">
            <span class="label-text">Payment Status</span>
            <input type="checkbox" v-model="payment" class="toggle toggle-primary">
          </label>
        </div>
        <div class="form-control w-full max-w-xs mt-4">
          <label class="label">
            <span class="label-text">Balance</span>
          </label>
          <input v-model="balance" type="number" placeholder="Enter balance" class="input input-bordered w-full max-w-xs">
        </div>
        <div class="modal-action">
          <button class="btn btn-error" @click.prevent="$emit('closeModal')">Close</button>
          <button class="btn btn-primary" @click.prevent="saveUserData" :disabled="isAdding">
            <span v-if="isAdding">Saving...</span>
            <span v-else>Add</span>
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>
