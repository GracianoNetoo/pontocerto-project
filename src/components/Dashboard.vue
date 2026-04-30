<template>
  <div class="bg-[#F5F5F4]">
    <div class="max-w-[1280px] mx-auto px-4 lg:px-8 py-6">
      <div class="flex gap-6">
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:block w-60 shrink-0">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-20 overflow-hidden"
            style="min-height: 500px;">
            <Sidebar />
          </div>
        </aside>

        <!-- Mobile sidebar overlay -->
        <div v-if="mobileSidebarOpen" class="lg:hidden fixed inset-0 z-50 flex">
          <div class="absolute inset-0 bg-black/40" @click="mobileSidebarOpen = false" />
          <div class="relative bg-white w-64 h-full shadow-xl">
            <Sidebar />
          </div>
        </div>

        <!-- Main content -->
        <main class="flex-1 min-w-0">
          <!-- Mobile tab header -->
          <div class="lg:hidden flex items-center gap-3 mb-5">
            <button @click="mobileSidebarOpen = true" class="p-2 bg-white rounded-xl border border-gray-200">
              <LayoutDashboard :size="16" class="text-gray-600" />
            </button>
            <h1 class="font-['DM_Sans'] font-bold text-gray-900">
              {{navItems.find(n => n.id === activeTab)?.label}}
            </h1>
          </div>

          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <div>
              <h1 class="font-['DM_Sans'] text-xl font-bold text-gray-900 mb-0.5">Bem-vindo, Carlos 👋</h1>
              <p class="text-gray-500 text-sm">Aqui está o resumo da sua actividade</p>
            </div>

            <!-- Stats cards -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="(stat, i) in stats" :key="i" class="bg-white rounded-2xl border border-gray-100 p-5">
                <div :class="['w-9 h-9 rounded-xl flex items-center justify-center mb-3', stat.colorClass]">
                  <component :is="stat.icon" :size="16" />
                </div>
                <p class="font-['DM_Sans'] text-2xl font-bold text-gray-900">{{ stat.value }}</p>
                <p class="text-gray-500 text-xs mt-0.5">{{ stat.label }}</p>
                <p class="text-green-600 text-xs font-medium mt-1">{{ stat.change }}</p>
              </div>
            </div>

            <!-- Recent properties -->
            <div class="bg-white rounded-2xl border border-gray-100 p-5">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-['DM_Sans'] font-bold text-gray-900">Os meus imóveis</h3>
                <button @click="activeTab = 'properties'"
                  class="text-blue-600 text-xs font-semibold hover:text-blue-800 flex items-center gap-1">
                  Ver todos
                  <ChevronRight :size="12" />
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="prop in myProperties" :key="prop.id"
                  class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <img :src="prop.images[0]" :alt="prop.title" class="w-12 h-10 rounded-lg object-cover shrink-0" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 truncate">{{ prop.title }}</p>
                    <p class="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin :size="10" />{{ prop.location }}
                    </p>
                  </div>
                  <p class="font-['DM_Sans'] font-bold text-blue-700 text-sm shrink-0">
                    {{ formatPrice(prop.price, prop.priceUnit) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Recent messages -->
            <div class="bg-white rounded-2xl border border-gray-100 p-5">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-['DM_Sans'] font-bold text-gray-900">Mensagens recentes</h3>
                <button @click="activeTab = 'messages'"
                  class="text-blue-600 text-xs font-semibold hover:text-blue-800 flex items-center gap-1">
                  Ver todas
                  <ChevronRight :size="12" />
                </button>
              </div>
              <div class="space-y-3">
                <RouterLink v-for="conv in conversations.slice(0, 3)" :key="conv.id"
                  :to="`/chat?property=${conv.propertyId}`">
                  <div class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <img :src="conv.contactAvatar" :alt="conv.contactName"
                      class="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-gray-900">{{ conv.contactName }}</p>
                      <p class="text-xs text-gray-500 truncate">{{ conv.lastMessage }}</p>
                    </div>
                    <div class="flex flex-col items-end gap-1">
                      <span class="text-xs text-gray-400">{{ conv.lastMessageTime }}</span>
                      <span v-if="conv.unread > 0"
                        class="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        {{ conv.unread }}
                      </span>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Properties Tab -->
          <div v-if="activeTab === 'properties'" class="space-y-5">
            <div class="flex items-center justify-between">
              <h2 class="font-['DM_Sans'] font-bold text-gray-900 text-lg">Os meus imóveis</h2>
              <RouterLink to="/publicar">
                <Button class="bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center gap-2">
                  <Plus :size="14" />
                  Novo anúncio
                </Button>
              </RouterLink>
            </div>

            <div class="space-y-4">
              <div v-for="prop in myProperties" :key="prop.id"
                class="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
                <img :src="prop.images[0]" :alt="prop.title" class="w-24 h-20 rounded-xl object-cover shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <h3 class="font-semibold text-gray-900 text-sm">{{ prop.title }}</h3>
                      <p class="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin :size="10" />{{ prop.location }}
                      </p>
                    </div>
                    <p class="font-['DM_Sans'] font-bold text-blue-700 text-sm shrink-0">
                      {{ formatPrice(prop.price, prop.priceUnit) }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 mt-2">
                    <span
                      :class="['text-xs font-medium px-2 py-0.5 rounded-full', prop.verified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700']">
                      {{ prop.verified ? '✓ Verificado' : '⏳ Em revisão' }}
                    </span>
                    <span class="text-xs text-gray-400">
                      Publicado {{ new Date(prop.publishedAt).toLocaleDateString('pt-AO') }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2 mt-3">
                    <RouterLink :to="`/imovel/${prop.id}`">
                      <Button variant="outline" size="sm" class="border-gray-200 text-xs flex items-center gap-1">
                        <Eye :size="12" />
                        Ver
                      </Button>
                    </RouterLink>
                    <Button variant="outline" size="sm" class="border-gray-200 text-xs flex items-center gap-1"
                      @click="() => { }">
                      <Edit2 :size="12" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm"
                      class="border-red-200 text-red-600 hover:bg-red-50 text-xs flex items-center gap-1"
                      @click="() => { }">
                      <Trash2 :size="12" />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Messages Tab -->
          <div v-if="activeTab === 'messages'" class="space-y-5">
            <h2 class="font-['DM_Sans'] font-bold text-gray-900 text-lg">Mensagens</h2>
            <div class="space-y-3">
              <RouterLink v-for="conv in conversations" :key="conv.id" :to="`/chat?property=${conv.propertyId}`">
                <div
                  class="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:border-blue-200 transition-all cursor-pointer">
                  <div class="relative shrink-0">
                    <img :src="conv.contactAvatar" :alt="conv.contactName"
                      class="w-11 h-11 rounded-full object-cover" />
                    <div v-if="conv.unread > 0"
                      class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <span class="text-white text-[9px] font-bold">{{ conv.unread }}</span>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-0.5">
                      <p class="font-semibold text-gray-900 text-sm">{{ conv.contactName }}</p>
                      <span class="text-xs text-gray-400">{{ conv.lastMessageTime }}</span>
                    </div>
                    <p class="text-xs text-blue-600 mb-0.5">{{ conv.propertyTitle }}</p>
                    <p :class="['text-xs truncate', conv.unread > 0 ? 'text-gray-700 font-medium' : 'text-gray-400']">
                      {{ conv.lastMessage }}
                    </p>
                  </div>
                  <ChevronRight :size="14" class="text-gray-400 shrink-0" />
                </div>
              </RouterLink>
            </div>
          </div>

          <!-- Visits Tab -->
          <div v-if="activeTab === 'visits'" class="space-y-5">
            <h2 class="font-['DM_Sans'] font-bold text-gray-900 text-lg">Visitas agendadas</h2>
            <div class="space-y-4">
              <div v-for="visit in visits" :key="visit.id"
                class="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
                <img :src="visit.propertyImage" :alt="visit.propertyTitle"
                  class="w-20 h-16 rounded-xl object-cover shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <h3 class="font-semibold text-gray-900 text-sm">{{ visit.propertyTitle }}</h3>
                      <p class="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin :size="10" />{{ visit.propertyLocation }}
                      </p>
                    </div>
                    <span
                      :class="['text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1', visitStatusClass(visit.status)]">
                      <component :is="visitStatusIcon(visit.status)" :size="10" />
                      <span class="capitalize">{{ visit.status }}</span>
                    </span>
                  </div>
                  <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span class="flex items-center gap-1">
                      <Calendar :size="11" />
                      {{ new Date(visit.date).toLocaleDateString('pt-AO', {
                        weekday: 'short', day: '2-digit', month:
                      'short' }) }}
                    </span>
                    <span>{{ visit.time }}</span>
                    <span>Com: {{ visit.contactName }}</span>
                  </div>
                  <div v-if="visit.status === 'pendente'" class="flex gap-2 mt-3">
                    <Button size="sm" class="bg-green-600 hover:bg-green-700 text-white text-xs">
                      Confirmar
                    </Button>
                    <Button variant="outline" size="sm" class="border-red-200 text-red-600 hover:bg-red-50 text-xs">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="space-y-5">
            <h2 class="font-['DM_Sans'] font-bold text-gray-900 text-lg">Definições da conta</h2>
            <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div class="flex items-center gap-4 pb-5 border-b border-gray-100">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Profile"
                  class="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p class="font-bold text-gray-900">Carlos Mendes</p>
                  <p class="text-gray-500 text-sm">carlos.mendes@email.com</p>
                  <p class="text-gray-500 text-sm">+244 923 456 789</p>
                </div>
                <Button variant="outline" size="sm" class="ml-auto border-gray-200">
                  Editar perfil
                </Button>
              </div>

              <div class="space-y-4">
                <div v-for="(setting, i) in settings" :key="i"
                  class="flex items-center justify-between py-3 border-b border-gray-50">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ setting.label }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ setting.desc }}</p>
                  </div>
                  <button class="w-10 h-6 bg-blue-600 rounded-full relative transition-colors">
                    <div class="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard, Home, MessageCircle, Calendar, Settings,
  Plus, Eye, Edit2, Trash2, CheckCircle2, Clock, XCircle,
  TrendingUp, Users, MapPin, Bell, ChevronRight, LogOut,
  BarChart3
} from 'lucide-vue-next'
import { PROPERTIES, CONVERSATIONS, VISITS, formatPrice } from '@/lib/mockData.js'

const activeTab = ref('overview')
const mobileSidebarOpen = ref(false)

const myProperties = PROPERTIES.slice(0, 3)
const conversations = CONVERSATIONS
const visits = VISITS

const totalViews = 1247
const totalContacts = 38

const stats = computed(() => [
  {
    label: 'Anúncios activos',
    value: myProperties.length,
    icon: Home,
    colorClass: 'bg-blue-50 text-blue-600',
    change: '+1 este mês'
  },
  {
    label: 'Visualizações',
    value: totalViews.toLocaleString(),
    icon: Eye,
    colorClass: 'bg-green-50 text-green-600',
    change: '+12% esta semana'
  },
  {
    label: 'Contactos',
    value: totalContacts,
    icon: Users,
    colorClass: 'bg-purple-50 text-purple-600',
    change: '+5 novos'
  },
  {
    label: 'Visitas agendadas',
    value: visits.filter(v => v.status !== 'cancelada').length,
    icon: Calendar,
    colorClass: 'bg-orange-50 text-orange-600',
    change: '2 esta semana'
  }
])

const navItems = [
  { id: 'overview', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'properties', label: 'Os meus imóveis', icon: Home },
  { id: 'messages', label: 'Mensagens', icon: MessageCircle, badge: CONVERSATIONS.reduce((s, c) => s + c.unread, 0) },
  { id: 'visits', label: 'Visitas agendadas', icon: Calendar },
  { id: 'settings', label: 'Definições', icon: Settings }
]

const settings = [
  { label: 'Notificações por email', desc: 'Receber alertas de novas mensagens e visitas' },
  { label: 'Notificações SMS', desc: 'Alertas urgentes por mensagem de texto' },
  { label: 'Perfil público', desc: 'Mostrar o meu perfil nos anúncios' }
]

const visitStatusClass = (status) => {
  const classes = {
    confirmada: 'bg-green-100 text-green-700',
    pendente: 'bg-amber-100 text-amber-700',
    cancelada: 'bg-red-100 text-red-600'
  }
  return classes[status] || ''
}

const visitStatusIcon = (status) => {
  const icons = {
    confirmada: CheckCircle2,
    pendente: Clock,
    cancelada: XCircle
  }
  return icons[status] || null
}

// Sidebar component
const Sidebar = {
  setup() {
    return () => h('div', { class: 'flex flex-col h-full' }, [
      // User profile
      h('div', { class: 'p-5 border-b border-gray-100' }, [
        h('div', { class: 'flex items-center gap-3' }, [
          h('img', {
            src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            alt: 'Carlos Mendes',
            class: 'w-10 h-10 rounded-full object-cover'
          }),
          h('div', [
            h('p', { class: 'font-semibold text-gray-900 text-sm' }, 'Carlos Mendes'),
            h('p', { class: 'text-gray-500 text-xs' }, 'Proprietário verificado')
          ])
        ])
      ]),

      // Navigation
      h('nav', { class: 'flex-1 p-3 space-y-1' },
        navItems.map(item => {
          const Icon = item.icon
          return h('button', {
            key: item.id,
            onClick: () => { activeTab.value = item.id; mobileSidebarOpen.value = false },
            class: [
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              activeTab.value === item.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            ]
          }, [
            h(Icon, { size: 16 }),
            h('span', { class: 'flex-1 text-left' }, item.label),
            item.badge ? h('span', {
              class: [
                'text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold',
                activeTab.value === item.id ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
              ]
            }, item.badge) : null
          ])
        })
      ),

      // Bottom actions
      h('div', { class: 'p-3 border-t border-gray-100 space-y-1' }, [
        h(RouterLink, { to: '/publicar' }, () => h(Button, {
          class: 'w-full bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center gap-2'
        }, () => [
          h(Plus, { size: 14 }),
          h('span', {}, 'Novo anúncio')
        ])),
        h('button', {
          onClick: () => { },
          class: 'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors'
        }, [
          h(LogOut, { size: 15 }),
          h('span', {}, 'Sair')
        ])
      ])
    ])
  }
}
</script>
