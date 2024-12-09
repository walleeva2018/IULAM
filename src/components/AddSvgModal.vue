<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSnacksStore } from '@/stores/counter'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Papa from 'papaparse';

const props = defineProps<{
  showModal: boolean
}>()

const emits = defineEmits(['closeModal', 'saveUser'])

const my_modal_1 = ref<HTMLDialogElement | null>(null)
const isAdding = ref(false)
const jsonInput = ref('')  // To hold the JSON data from the text area
const { setUser } = useSnacksStore()

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

    const filteredData = Object.fromEntries(
      Object.entries(jsonData).filter(([key, value]) => key.trim() !== "" && value.trim() !== "")
    );

    console.log("Parsed and Filtered JSON Data:", filteredData);
  } catch (error) {
    toast.error("Invalid JSON format.");
  }
}

// Handle JSON or CSV file upload
function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (content) {
        if (file.type === "application/json") {
          try {
            const jsonData = JSON.parse(content as string);
            const mappedJsonData = jsonData.map((item: any) => mapKeys(item));
            console.log("Uploaded and Mapped JSON Data:", mappedJsonData);
            jsonInput.value = JSON.stringify(mappedJsonData, null, 2); // Display in text area
          } catch (error) {
            toast.error("Invalid JSON file format.");
          }
        } else if (file.type === "text/csv") {
          Papa.parse(content as string, {
            header: true,
            complete: (results) => {
              const filteredData = results.data.map((row: any) =>
                Object.fromEntries(
                  Object.entries(row).filter(([key, value]) => key.trim() !== "" && value.trim() !== "")
                )
              );
              const mappedCsvData = filteredData.map((item: any) => mapKeys(item));
              console.log("Uploaded and Mapped CSV Data:", mappedCsvData);
              jsonInput.value = JSON.stringify(mappedCsvData, null, 2); // Display in text area
            },
            error: (error) => {
              toast.error("Invalid CSV file format.");
            }
          });
        } else {
          toast.error("Unsupported file format. Please upload a JSON or CSV file.");
        }
      }
    };
    reader.readAsText(file);
  }
}

// Key mapping function
function mapKeys(data: any): any {
  const keyMapping: { [key: string]: string } = {
    "Course Name": "courseName",
    "First Name": "firstName",
    "Last Name": "lastName",
    "Foreign": "foreign",
    "Date of Class": "dateOfClass",
    "Month": "month",
    "Name of Class": "className",
    "Kind of Class": "kindOfClass",
    "Duration (hrs)": "duration",
    "Amount to Pay in $U": "amountToPayInU",
    "Foreign Currency Amount": "amountInForeignCurrency",
    "Travel expenses": "travelExpenses",
    "ID Num": "idNum",
    "Birth Date": "birthDate",
    "Persons in Charge": "personsInCharge",
    "Account Type": "accountType",
    "Bank Name": "bankName",
    "Account Number": "accountNumber"
  };

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [keyMapping[key.trim()] || key.trim(), value])
  );
}


async function addUser() {
  if (!jsonInput.value) {
    toast.error("No JSON data provided.");
    return;
  }

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
  <dialog id="my_modal_1" ref="my_modal_1" class="modal" @click.self="$emit('closeModal')">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-xl py-3">Edit User Information</h3>
      
      <!-- Instructions with Hyperlink -->
    

      <!-- Text Area for JSON Input -->
      <textarea 
        v-model="jsonInput" 
        placeholder="Paste your JSON data here..." 
        class="textarea textarea-bordered w-full mb-4" 
        rows="6">
      </textarea>
    

      <!-- File Upload for JSON or CSV -->
      <input type="file" accept=".json,.csv" @change="handleFileUpload" class="mb-4" />
      
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