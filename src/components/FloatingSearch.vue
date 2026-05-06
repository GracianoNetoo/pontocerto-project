<template>
  <div class="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
    <!-- Tooltip / Balão de fala futuro para a IA -->
    <Transition name="fade">
      <div v-if="showLabel" class="bg-gray-900 text-white text-xs py-2 px-3 rounded-lg shadow-xl mr-2">
        Use a Ai para pesquisar os melhores lugares!
      </div>
    </Transition>

    <!-- Botão Principal -->
    <button 
      @mouseenter="showLabel = true"
      @mouseleave="showLabel = false"
      @click="handleAction"
      class="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 group relative"
    >
      <!-- Ícone de Pesquisa -->
      <Search v-if="!isAiActive" :size="24" class="group-hover:scale-110 transition-transform" />
      
      <!-- Ícone de faísca/IA (reservado para o futuro) -->
      <Sparkles v-else :size="24" class="animate-pulse" />

      <!-- Ping de Notificação / Status -->
      <span class="absolute -top-1 -right-1 flex h-4 w-4">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Sparkles } from 'lucide-vue-next'

const router = useRouter()
const showLabel = ref(false)
const isAiActive = ref(false) 

const handleAction = () => {
  router.push('/pesquisa')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>