<template>
  <div class="bg-[#F5F5F4] flex flex-col">
    <div class="flex-1 max-w-[1280px] mx-auto w-full px-4 lg:px-8 py-6">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        :style="{ height: 'calc(100vh - 140px)' }">
        <div class="flex h-full">
          <!-- Left: Conversations list -->
          <div :class="[
            'w-full lg:w-80 xl:w-96 border-r border-gray-100 flex flex-col shrink-0',
            !showMobileConvList ? 'hidden lg:flex' : 'flex'
          ]">
            <!-- Header -->
            <div class="p-4 border-b border-gray-100">
              <h2 class="font-['DM_Sans'] font-bold text-gray-900 text-lg mb-3">Mensagens</h2>
              <div class="relative">
                <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" v-model="searchQuery" placeholder="Pesquisar conversas..."
                  class="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 border border-gray-100" />
              </div>
            </div>

            <!-- Conversation list -->
            <div class="flex-1 overflow-y-auto">
              <div v-if="filteredConvs.length === 0" class="p-8 text-center text-gray-400 text-sm">
                Nenhuma conversa encontrada
              </div>
              <template v-else>
                <button v-for="conv in filteredConvs" :key="conv.id" @click="handleSelectConv(conv.id)" :class="[
                  'w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left',
                  activeConvId === conv.id ? 'bg-blue-50 border-l-2 border-l-blue-600' : ''
                ]">
                  <!-- Avatar -->
                  <div class="relative shrink-0">
                    <img :src="conv.contactAvatar" :alt="conv.contactName"
                      class="w-10 h-10 rounded-full object-cover" />
                    <div v-if="conv.unread > 0"
                      class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <span class="text-white text-[9px] font-bold">{{ conv.unread }}</span>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-0.5">
                      <p
                        :class="['text-sm font-semibold truncate', conv.unread > 0 ? 'text-gray-900' : 'text-gray-700']">
                        {{ conv.contactName }}
                      </p>
                      <span class="text-xs text-gray-400 shrink-0 ml-2">{{ conv.lastMessageTime }}</span>
                    </div>
                    <p class="text-xs text-blue-600 truncate mb-0.5">{{ conv.propertyTitle }}</p>
                    <p :class="['text-xs truncate', conv.unread > 0 ? 'text-gray-700 font-medium' : 'text-gray-400']">
                      {{ conv.lastMessage }}
                    </p>
                  </div>
                </button>
              </template>
            </div>
          </div>

          <!-- Right: Chat window -->
          <div :class="[
            'flex-1 flex flex-col min-w-0',
            showMobileConvList ? 'hidden lg:flex' : 'flex'
          ]">
            <template v-if="activeConv">
              <!-- Chat header -->
              <div class="p-4 border-b border-gray-100 flex items-center gap-3">
                <button @click="showMobileConvList = true" class="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft :size="16" class="text-gray-600" />
                </button>
                <img :src="activeConv.contactAvatar" :alt="activeConv.contactName"
                  class="w-9 h-9 rounded-full object-cover" />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 text-sm">{{ activeConv.contactName }}</p>
                  <div class="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin :size="10" />
                    <span class="truncate">{{ activeConv.propertyTitle }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button @click="() => { }" class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <Phone :size="15" class="text-gray-500" />
                  </button>
                  <button @click="() => { }" class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <MoreVertical :size="15" class="text-gray-500" />
                  </button>
                </div>
              </div>

              <!-- Property context bar -->
              <div class="px-4 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
                <img :src="activeConv.propertyImage" :alt="activeConv.propertyTitle"
                  class="w-10 h-8 rounded-lg object-cover" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold text-blue-900 truncate">{{ activeConv.propertyTitle }}</p>
                </div>
                <RouterLink :to="`/imovel/${activeConv.propertyId}`">
                  <span class="text-xs text-blue-600 font-semibold hover:text-blue-800 shrink-0">
                    Ver imóvel →
                  </span>
                </RouterLink>
              </div>

              <!-- Messages -->
              <div class="flex-1 overflow-y-auto p-4 space-y-3">
                <div v-for="msg in activeConv.messages" :key="msg.id"
                  :class="['flex', msg.isOwn ? 'justify-end' : 'justify-start']">
                  <img v-if="!msg.isOwn" :src="activeConv.contactAvatar" :alt="msg.senderName"
                    class="w-7 h-7 rounded-full object-cover mr-2 mt-1 shrink-0" />
                  <div :class="['max-w-[70%] flex flex-col gap-1', msg.isOwn ? 'items-end' : 'items-start']">
                    <div :class="[
                      'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                      msg.isOwn ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    ]">
                      {{ msg.content }}
                    </div>
                    <span class="text-xs text-gray-400 px-1">{{ msg.timestamp }}</span>
                  </div>
                </div>
                <div ref="messagesEndRef" />
              </div>

              <!-- Message input -->
              <div class="p-4 border-t border-gray-100">
                <div
                  class="flex items-end gap-3 bg-gray-50 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <textarea v-model="newMessage" @keydown="handleKeyDown" placeholder="Escreva uma mensagem..." rows="1"
                    class="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none resize-none max-h-24"
                    style="line-height: 1.5;" />
                  <button @click="handleSend" :disabled="!newMessage.trim()" :class="[
                    'p-2 rounded-xl transition-all shrink-0',
                    newMessage.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  ]">
                    <Send :size="15" />
                  </button>
                </div>
                <p class="text-xs text-gray-400 mt-2 text-center">
                  Prima Enter para enviar · Shift+Enter para nova linha
                </p>
              </div>
            </template>

            <!-- Empty state -->
            <div v-else class="flex-1 flex items-center justify-center">
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Send :size="24" class="text-blue-400" />
                </div>
                <h3 class="font-['DM_Sans'] font-bold text-gray-900 mb-2">Seleccione uma conversa</h3>
                <p class="text-gray-500 text-sm">Escolha uma conversa da lista para começar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Send, Search, ArrowLeft, Phone, MoreVertical, MapPin } from 'lucide-vue-next'
import { CONVERSATIONS } from '@/lib/mockData'

const route = useRoute()
const router = useRouter()

const propertyId = computed(() => route.query.property)

const conversations = ref([...CONVERSATIONS])
const activeConvId = ref(null)
const newMessage = ref('')
const searchQuery = ref('')
const showMobileConvList = ref(true)
const messagesEndRef = ref(null)

const activeConv = computed(() => conversations.value.find(c => c.id === activeConvId.value))

const filteredConvs = computed(() => {
  return conversations.value.filter(c =>
    c.contactName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    c.propertyTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Auto-select conversation based on URL param
onMounted(() => {
  if (propertyId.value) {
    const conv = conversations.value.find(c => c.propertyId === propertyId.value)
    if (conv) {
      activeConvId.value = conv.id
      showMobileConvList.value = false
    }
  } else if (conversations.value.length > 0) {
    activeConvId.value = conversations.value[0].id
  }
})

// Scroll to bottom on new messages
watch([activeConvId, conversations], () => {
  nextTick(() => {
    messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
}, { deep: true })

const handleSend = () => {
  if (!newMessage.value.trim() || !activeConvId.value) return

  const msg = {
    id: `m${Date.now()}`,
    senderId: 'me',
    senderName: 'Eu',
    content: newMessage.value.trim(),
    timestamp: new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }),
    isOwn: true,
  }

  conversations.value = conversations.value.map(c =>
    c.id === activeConvId.value
      ? { ...c, messages: [...c.messages, msg], lastMessage: msg.content, lastMessageTime: msg.timestamp, unread: 0 }
      : c
  )
  newMessage.value = ''
}

const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

const handleSelectConv = (convId) => {
  activeConvId.value = convId
  showMobileConvList.value = false
  // Mark as read
  conversations.value = conversations.value.map(c =>
    c.id === convId ? { ...c, unread: 0 } : c
  )
}
</script>
