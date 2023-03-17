<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')

const submitUsername = () => {
  // userStore.setUsername(username.value)
  localStorage.setItem('username', username.value)
  router.push('/chat')
}
</script>

<template>
  <section class="max-w-xl mt-12 mx-auto border border-gray-400 rounded-md p-4">
    <input
      type="text"
      v-model="username"
      placeholder="Your name?"
      class="p-4 w-full border border-gray-500 rounded-md mb-6"
    />

    <button class="p-4 w-full bg-blue-700 text-white rounded-md" @click="submitUsername">
      Submit
    </button>
  </section>
</template>
