<template>
  <div class="min-h-[80vh] flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div class="flex border-b border-gray-100">
        <button 
          @click="isLogin = true"
          :class="['flex-1 py-4 text-sm font-semibold transition-colors', isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600']"
        >
          Entrar
        </button>
        <button 
          @click="isLogin = false"
          :class="['flex-1 py-4 text-sm font-semibold transition-colors', !isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600']"
        >
          Criar Conta
        </button>
      </div>

      <div class="p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 font-['DM_Sans']">
            {{ isLogin ? 'Bem-vindo de volta' : 'Comece agora' }}
          </h2>
          <p class="text-gray-500 text-sm mt-2">
            {{ isLogin ? 'Acesse sua conta para gerenciar seus imóveis.' : 'Crie sua conta para salvar favoritos e publicar.' }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="!isLogin" class="space-y-1">
            <label class="text-xs font-bold text-gray-700 uppercase tracking-wider">Nome Completo</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="18" />
              <input 
                v-model="form.name"
                type="text" 
                placeholder="Ex: João Silva"
                class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-700 uppercase tracking-wider">E-mail</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="18" />
              <input 
                v-model="form.email"
                type="email" 
                placeholder="seu@email.com"
                class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <!-- Senha -->
          <div class="space-y-1">
            <div class="flex justify-between">
              <label class="text-xs font-bold text-gray-700 uppercase tracking-wider">Senha</label>
              <a v-if="isLogin" href="#" class="text-[10px] text-blue-600 hover:underline">Esqueceu a senha?</a>
            </div>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="18" />
              <input 
                v-model="form.password"
                type="password" 
                placeholder="••••••••"
                class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <!-- Botão Submit -->
          <button 
            type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
          >
            {{ isLogin ? 'Entrar' : 'Cadastrar' }}
            <ArrowRight :size="18" />
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center"><span class="w-full border-t border-gray-100"></span></div>
          <div class="relative flex justify-center text-xs uppercase"><span class="bg-white px-2 text-gray-400">Ou continuar com</span></div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-4 h-4" alt="Google" />
            Google
          </button>
          <button class="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" class="w-4 h-4" alt="Facebook" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Mail, Lock, ArrowRight } from 'lucide-vue-next'

const isLogin = ref(true)
const form = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  console.log('Dados submetidos:', { ...form, type: isLogin.value ? 'login' : 'signup' })
  // Aqui você integraria com sua API ou Firebase/Supabase
  alert(isLogin.value ? 'Fazendo login...' : 'Criando conta...')
}
</script>