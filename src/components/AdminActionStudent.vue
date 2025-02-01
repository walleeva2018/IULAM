<script setup lang="ts">
import {  ref } from 'vue'
import { useRouter } from 'vue-router'

import AddSvgModal from '@/components/AddSvgModal.vue'
import AddStudentModal from './AddStudentModal.vue'

const props = defineProps<{
  totalUser: number
  
}>()

const showCsvModal = ref(false)

const showModal = ref(false)



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
    <AddStudentModal :show-modal="showModal" @close-modal="showModal = false" />
    <AddSvgModal :show-modal="showCsvModal" @close-modal="showCsvModal = false" />
    
    <div class="divider" />
  </div>
</template>
