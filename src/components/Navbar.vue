<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
import { getAuth, signOut } from 'firebase/auth'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSnacksStore } from '@/stores/counter'

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()
const snackStore = useSnacksStore()

const { loginUser } = storeToRefs(snackStore)

const isRoot = computed(() => (route.fullPath === '/'))
const isCurrent = computed(() => route.fullPath === '/current-students')
const isPastStudent = computed(() => route.fullPath === '/past-students')
const isTeacher = computed(() => route.fullPath === '/teachers')
const isCommunity = computed(() => route.fullPath === '/community')


async function onLogoutClick() {
  try {
    const auth = getAuth()
    await signOut(auth)

    snackStore.resetStore()
    router.push('/')
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

function formatDate(dateString: string): string {
  const currentDate = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return currentDate.toLocaleDateString('en-US', options)
}
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
          to="/current-students"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isCurrent }"
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
          to="/teachers"
          class="btn btn-ghost normal-case text-xl"
          :class="{ 'text-primary': isTeacher }"
        >
          Teachers
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
