<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ToggleUserModal from './ToggleUserModal.vue'
import { useSnacksStore } from '@/stores/counter'
import AddMoneyModal from '@/components/AddMoneyModal.vue'
import AddSvgModal from '@/components/AddSvgModal.vue'

const props = defineProps<{
  totalUser: number
  
}>()

const snacksStore = useSnacksStore()

const { allUsers } = storeToRefs(snacksStore)
const showCsvModal = ref(false)

const showModal = ref(false)

const toggleUser = ref(false)

const totalBalance = computed(() => {
  return allUsers.value.reduce((pre, curr) => {
    return pre += curr.balance || 0
  }, 0) || 0
})

const router = useRouter()
function hanldePrint() {
  window.print()
}


</script>

<template>
  <div>
    <div class="flex justify-around mt-4 print:hidden">
      <div class="card  bg-base-200 space-x-4  p-5">
        <div class="flex space-x-3 justify-around">
          <button class="btn btn-primary" @click="showModal = !showModal">
            Add User
          </button>
          <button class="btn btn-primary" @click="showCsvModal = !showCsvModal">
           Add From CSV
          </button>
        
          <button class="btn btn-primary" @click="hanldePrint">
            Print
          </button>
        </div>
      </div>
      <div class="card w-130 bg-base-200  p-5 justify-center">
        <div class="flex space-x-5 items-center justify-between">
          <h2 class="card-title">
            Total Students
          </h2>
          <div class="form-control">
            <p>{{ totalUser }}</p>
          </div>
        </div>
      </div>
    </div>
    <AddMoneyModal :show-modal="showModal" @close-modal="showModal = false" />
    <AddSvgModal :show-modal="showCsvModal" @close-modal="showCsvModal = false" />
    
    <div class="divider" />
  </div>
</template>
