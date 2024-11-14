<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSnacksStore } from '@/stores/counter'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



const props = defineProps<{
  showModal: boolean
}>()

const emits = defineEmits(['closeModal', 'saveUser'])

const my_modal_1 = ref<HTMLDialogElement | null>(null)
const isAdding = ref(false)
const jsonInput = ref('')  // To hold the JSON data from the text area
const {setUser} = useSnacksStore()

watch(
  () => props.showModal,
  (newVal) => {
    if (newVal) {
      my_modal_1.value?.showModal()
    } else {
      my_modal_1.value?.close()
    }
  },
  { immediate: true }
)

// Handle JSON input from text area or file upload
function handleJSONInput() {
  try {
    const jsonData = JSON.parse(jsonInput.value);
    console.log("Parsed JSON Data:", jsonData);
  } catch (error) {
    toast.error("Invalid JSON format.");
  }
}

// Handle JSON file upload
function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (content) {
        try {
          const jsonData = JSON.parse(content as string);
          console.log("Uploaded JSON Data:", jsonData);
          jsonInput.value = JSON.stringify(jsonData, null, 2); // Display in text area
        } catch (error) {
          toast.error("Invalid JSON file format.");
        }
      }
    };
    reader.readAsText(file);
  }
}

async function addUser() {
  if (!jsonInput.value) {
    toast.error("No JSON data provided.");
    return;
  }

  console.log('coma coam')

  try {
    const users = JSON.parse(jsonInput.value);

    if (!Array.isArray(users)) {
      toast.error("JSON data should be an array of users.");
      return;
    }

    isAdding.value = true;

    for (const user of users) {
      // Assuming each `user` has the necessary data for `setUser`
      await setUser(user);  // Add each user to the store
    }

    toast.success("All users added successfully!");
    emits('closeModal'); // Close modal after saving
  } catch (error) {
    toast.error("Failed to parse JSON data or add users.");
  } finally {
    isAdding.value = false;
  }
}
</script>

<template>
  <dialog id="my_modal_1" ref="my_modal_1" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-xl py-3">Edit User Information</h3>
      
      <!-- Instructions with Hyperlink -->
      <p class="mb-3">
        Please ensure your JSON data follows the correct format. 
        <a href="https://csvjson.com/csv2json" target="_blank" class="text-blue-500 underline">
          Click here for the JSON format guide.
        </a>
      </p>

      <!-- Text Area for JSON Input -->
      <textarea 
        v-model="jsonInput" 
        placeholder="Paste your JSON data here..." 
        class="textarea textarea-bordered w-full mb-4" 
        rows="6">
      </textarea>
      <button class="btn btn-secondary mb-4" @click.prevent="handleJSONInput">
        Parse JSON Data
      </button>

      <!-- File Upload for JSON -->
      <input type="file" accept=".json" @change="handleFileUpload" class="mb-4" />
      
      <div class="modal-action">
        <button class="btn btn-error" @click.prevent="emits('closeModal')">Close</button>
        <button class="btn btn-primary" @click.prevent="addUser" :disabled="isAdding">
          <span v-if="isAdding">Saving...</span>
          <span v-else>Add User</span>
        </button>
      </div>
    </form>
  </dialog>
</template>
