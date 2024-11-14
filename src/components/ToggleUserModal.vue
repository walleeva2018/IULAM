<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFirestore } from 'vuefire'
import { storeToRefs } from 'pinia'
import { doc, updateDoc } from 'firebase/firestore'
import { useSnacksStore } from '@/stores/counter'

interface Props {
  showModal: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
})

const emits = defineEmits(['closeModal', 'filter'])

const my_modal_3 = ref<HTMLDialogElement | null>(null)
const isAdding = ref(false)

const filters = ref({
  paymentDone: false,
  courseCompleted: false,
  averageAge:false,
  sortByPlace: '',
})

function applyFilters() {
 emits('filter', filters)
}

watch(
  () => props.showModal,
  (n) => {
    if (n) {
      my_modal_3.value?.showModal()
    } else {
      emits('closeModal')
      my_modal_3.value?.close()
    }
  },
  { immediate: true }
)


</script>

<template>
  <div @keydown.esc="$emit('closeModal')">
    <dialog id="my_modal_3" ref="my_modal_3" class="modal large">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-xl py-3 border-b mb-4">
          Enable or Disable Order
        </h3>
        
        <!-- Filtering Options -->
        <div class="mb-4">
          <label class="block font-medium mb-2">Filter Options</label>
          
          <!-- Payment Status Filter -->

          <div class="form-control">
  <label class="cursor-pointer label">
    <span>only payments done</span>
    <input v-model="filters.paymentDone" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
          <!-- Course Completion Filter -->


          <div class="form-control">
  <label class="cursor-pointer label">
    <span>only courses completed</span>
    <input v-model="filters.courseCompleted" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>

          <h2> Report </h2>

          <div class="form-control">
  <label class="cursor-pointer label">
    <span>Average Age</span>
    <input v-model="filters.averageAge" type="checkbox" class="toggle toggle-primary" />
  </label>
</div>
         
          
          <!-- Sort by Place Filter -->
          <div class="mb-3">
            <label class="block">Sort by Place</label>
            <select v-model="filters.sortByPlace" class="select select-bordered w-full">
              <option value="">Select Place</option>
              <option value="cityA">City A</option>
              <option value="cityB">City B</option>
              <!-- Add more options as needed -->
            </select>
          </div>
        </div>
        
        <!-- Apply Filters Button -->
        <div class="modal-action">
          <button type="button" class="btn btn-primary" @click="applyFilters">
            Apply Filters
          </button>
          <button class="btn btn-error" :disabled="isAdding" @click.prevent="$emit('closeModal')">
            Close
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

