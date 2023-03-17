import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref(null)
  function setUsername(username) {
    this.username = username
  }

  return { username, setUsername }
})
