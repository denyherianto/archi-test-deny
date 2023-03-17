<script setup lang="ts">
import clsx from 'clsx'
import { ref } from 'vue'
import { supabase } from '../configs/supabase'

const chatWindow = ref(null)
const message = ref('')
const messages = ref([])
const messagesCount = ref(0)
const maxMessagesPerRequest = 500
const username = localStorage.getItem('username')
interface IMessage {
  username: string
  text: string
  timestamp: string
}

const fetchMessages = async (from: number, to: number) => {
  const { data } = await supabase
    .from('messages')
    .select()
    .range(from, to)
    .order('timestamp', { ascending: true })
  return data
}
const onNewMessage = async (handler: (value: IMessage) => void) => {
  supabase
    .channel('any')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
      handler(payload.new as IMessage)
    })
    .subscribe()
}
const createNewMessage = async () => {
  await supabase.from('messages').insert({ username: username, text: message.value })

  message.value = ''
}

onNewMessage((newMessage: IMessage): void => {
  messages.value = [...messages.value, newMessage]
  messagesCount.value += 1
  setTimeout(() => {
    if (chatWindow.value) {
      chatWindow.value.scrollTop = chatWindow.value?.scrollHeight + 100
    }
  }, 100)
})

const loadMessages = async () => {
  const loadedMessages = await fetchMessages(messagesCount.value, maxMessagesPerRequest - 1)

  messages.value = [...messages.value, ...loadedMessages]
  messagesCount.value += loadedMessages.length
}

loadMessages()
</script>

<template>
  <section class="max-w-2xl mt-12 mx-auto border border-gray-400 rounded-md p-4">
    <div class="grid grid-cols-12 space-x-2">
      <div
        class="col-span-12 p-4 min-h-[400px] max-h-[500px] overflow-auto border border-gray-400 rounded-md mb-4"
        ref="chatWindow"
      >
        <div
          v-for="message in messages"
          :key="`message-${message.timestamp}`"
          :class="clsx('flex justify-start', message.username === username && 'justify-end')"
        >
          <div
            :class="
              clsx(
                'p-2 rounded-md border border-gray-200 max-w-md mb-4',
                message.username === username && 'bg-blue-500 text-white text-right'
              )
            "
          >
            {{ message.text }}
            <hr />
            <div class="text-xs">{{ message.username }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 space-x-2">
      <div class="col-span-10">
        <input
          type="text"
          v-model="message"
          placeholder="Your message to the world?"
          class="p-4 w-full border border-gray-500 rounded-md mb-6"
        />
      </div>
      <div class="col-span-2">
        <button class="p-4 w-full bg-blue-700 text-white rounded-md" @click="createNewMessage">
          Submit
        </button>
      </div>
    </div>
  </section>
</template>
