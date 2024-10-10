<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

// Hardcoded username and password for authentication
const validUsername = 'user123'
const validPassword = 'password123'

// State variables
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const showProcessing = ref(false)
const router = useRouter()

// Toggle to show or hide the password
const showPassword = ref(false)

// Helper to set a cookie
function setCookie(name: string, value: string, days: number) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + value + expires + '; path=/'
}

// Function to handle sign in
function handleSignIn() {
  showProcessing.value = true
  if (username.value === validUsername && password.value === validPassword) {
    // Set a cookie to authenticate
    setCookie('authToken', 'authenticated', 7)
    showProcessing.value = false
    router.push('/') // Redirect to snacks page on successful login
  } else {
    showProcessing.value = false
    errorMsg.value = 'Invalid username or password'
  }
}

// Clear error message when inputs change
watch([username, password], () => {
  errorMsg.value = ''
})
</script>

<template>
  <div class="container max-w-5xl h-full mx-auto">
    <div class="flex justify-center h-full items-center">
      <div class="flex flex-col space-y-4 p-10 m-5 rounded-lg shadow-md bg-base-100">
        <div>
          <h1 class="text-4xl text-center font-bold text-primary">Login</h1>
        </div>
        <input
          v-model="username"
          type="text"
          placeholder="Enter Your Username"
          class="input input-bordered input-primary w-full max-w-xs"
        >
        <div class="relative w-full max-w-xs">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter Your Password"
            class="input input-bordered input-primary w-full"
          >
          <button
            type="button"
            class="absolute inset-y-0 right-0 px-3 flex items-center"
            @click="showPassword = !showPassword"
          >
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.148.493-.322.978-.522 1.454A11.935 11.935 0 0112 19c-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A8.975 8.975 0 0112 19a9 9 0 01-9-9c0-1.253.255-2.445.725-3.525m2.492-1.492A8.968 8.968 0 0112 5c4.477 0 8.268 2.943 9.542 7-.148.493-.322.978-.522 1.454m-2.558 1.678A8.963 8.963 0 0112 17a8.975 8.975 0 01-2.16-.275M3 3l18 18" />
            </svg>
          </button>
        </div>
        <button
          class="btn btn-primary"
          :class="{ loading: showProcessing === true }"
          @click="handleSignIn"
        >
          Authenticate
        </button>
        <div v-if="errorMsg.length > 0" class="alert alert-error shadow-lg">
          <span>{{ errorMsg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
