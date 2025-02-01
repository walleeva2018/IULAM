<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()


const isRoot = computed(() => (route.fullPath === '/'))
const isCurrent = computed(() => route.fullPath === '/current-teachers')
const isPastTeacher = computed(() => route.fullPath === '/past-teachers')
const isCurrentStudent = computed(() => route.fullPath === '/current-students')
const isPastStudent = computed(() => route.fullPath === '/past-students')
const isCommunity = computed(() => route.fullPath === '/community')

</script>

<template>
  <header class="border-b">
    <div class="navbar bg-base-100 mx-auto max-w-5xl">
      <div class="flex-1">
        <RouterLink
          to="/"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isRoot }"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/current-teachers"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isCurrent }"
        >
          Current Teachers
        </RouterLink>
        <RouterLink
          to="/past-teachers"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isPastTeacher }"
        >
          Past Teachers
        </RouterLink>
        <RouterLink
          to="/current-students"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isCurrentStudent }"
        >
          Current Students
        </RouterLink>
        <RouterLink
          to="/past-students"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isPastStudent }"
        >
          Past Students
        </RouterLink>

        <RouterLink
          to="/community"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isCommunity }"
        >
          Community
        </RouterLink>
      </div>
     
    </div>
  </header>
</template>

<style scoped>
.date-text {
  margin-right: 10px;
  font-family:  sans-serif;
  font-size: 15px;
  color: #4A07DA;
}
.order-text{
  margin-right: 5px;
  font-size: 15px;
}
</style>
