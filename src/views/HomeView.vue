<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import { useSnacksStore } from '@/stores/counter'

const snacksStore = useSnacksStore()

snacksStore.getUser()
</script>

<template>
  <div class="mx-auto flex-col space-y-2 max-w-5xl flex justify-center items-center h-full">
    <h1 class="text-2xl py-8 ">
      Welcome to  IULAM
    </h1>
    <Hero />
    <h1 class="text-xl pt-5 font-bold ">
      Through training and updating the knowledge of professionals and technicians, we promote and protect breastfeeding and comprehensive early childhood care.
    </h1>
  </div>
</template>
