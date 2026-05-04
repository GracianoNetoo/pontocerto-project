<template>
  <div class="min-h-screen bg-[#F5F5F4]">
    <Navbar />

    <div v-if="property" class="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <RouterLink to="/" class="hover:text-blue-600">Início</RouterLink>
        <span>/</span>
        <RouterLink to="/pesquisa" class="hover:text-blue-600">Imóveis</RouterLink>
        <span>/</span>
        <span class="text-gray-900 font-medium truncate">{{ property.title }}</span>
      </div>

      <!-- Image Gallery -->
      <div class="mb-8">
        <div class="relative rounded-2xl overflow-hidden bg-gray-100" style="aspect-ratio: 16/7;">
          <img :src="property.images[currentImage]" :alt="property.title" class="w-full h-full object-cover" />
          <!-- Navigation arrows -->
          <template v-if="property.images.length > 1">
            <button @click="currentImage = (currentImage - 1 + property.images.length) % property.images.length"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
              <ChevronLeft :size="18" class="text-gray-700" />
            </button>
            <button @click="currentImage = (currentImage + 1) % property.images.length"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
              <ChevronRight :size="18" class="text-gray-700" />
            </button>
          </template>
          <!-- Image counter -->
          <div class="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
            {{ currentImage + 1 }} / {{ property.images.length }}
          </div>
          <!-- Badges -->
          <div class="absolute top-4 left-4 flex gap-2">
            <span v-for="b in property.badges" :key="b"
              :class="['text-xs font-semibold px-3 py-1 rounded-full', badgeClass(b)]">
              {{ b }}
            </span>
          </div>
        </div>

        <!-- Thumbnail strip -->
        <div v-if="property.images.length > 1" class="flex gap-3 mt-3">
          <button v-for="(img, i) in property.images" :key="i" @click="currentImage = i" :class="[
            'w-20 h-14 rounded-lg overflow-hidden border-2 transition-all',
            currentImage === i ? 'border-blue-600' : 'border-transparent opacity-70 hover:opacity-100'
          ]">
            <img :src="img" alt="" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Main content + Sidebar -->
      <div class="flex gap-8 items-start">
        <!-- Left: Property info -->
        <div class="flex-1 min-w-0 space-y-6">
          <!-- Title + actions -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 class="font-['DM_Sans'] text-2xl font-bold text-gray-900 mb-1">{{ property.title }}</h1>
                <div class="flex items-center gap-1.5 text-gray-500 text-sm">
                  <MapPin :size="14" />
                  <span>{{ property.location }}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button @click="saved = !saved"
                  :class="['p-2 rounded-xl border transition-all', saved ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-gray-200 text-gray-500 hover:border-rose-200 hover:text-rose-400']">
                  <Heart :size="16" :fill="saved ? 'currentColor' : 'none'" />
                </button>
                <button @click="copyLink"
                  class="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-500 transition-all">
                  <Share2 :size="16" />
                </button>
              </div>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-2 mb-4">
              <p class="font-['DM_Sans'] text-3xl font-bold text-blue-700">
                {{ formatPrice(property.price, property.priceUnit) }}
              </p>
              <div v-if="property.verified" class="flex items-center gap-1 text-green-600 text-sm font-medium">
                <CheckCircle2 :size="14" />
                Documentação verificada
              </div>
            </div>

            <!-- Key stats -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
              <div v-if="property.bedrooms" class="text-center">
                <div class="flex items-center justify-center gap-1.5 text-gray-500 text-xs mb-1">
                  <Bed :size="13" />
                  <span>Quartos</span>
                </div>
                <p class="font-['DM_Sans'] font-bold text-gray-900">{{ property.bedrooms }}</p>
              </div>
              <div v-if="property.bathrooms" class="text-center">
                <div class="flex items-center justify-center gap-1.5 text-gray-500 text-xs mb-1">
                  <Bath :size="13" />
                  <span>Casas de banho</span>
                </div>
                <p class="font-['DM_Sans'] font-bold text-gray-900">{{ property.bathrooms }}</p>
              </div>
              <div v-if="property.area" class="text-center">
                <div class="flex items-center justify-center gap-1.5 text-gray-500 text-xs mb-1">
                  <Square :size="13" />
                  <span>Área</span>
                </div>
                <p class="font-['DM_Sans'] font-bold text-gray-900">{{ property.area }} m²</p>
              </div>
              <div v-if="property.garage" class="text-center">
                <div class="flex items-center justify-center gap-1.5 text-gray-500 text-xs mb-1">
                  <Car :size="13" />
                  <span>Garagem</span>
                </div>
                <p class="font-['DM_Sans'] font-bold text-gray-900">{{ property.garage }}</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 class="font-['DM_Sans'] font-bold text-gray-900 mb-3">Descrição</h2>
            <p class="text-gray-600 text-sm leading-relaxed">{{ property.description }}</p>
          </div>

          <!-- Features -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 class="font-['DM_Sans'] font-bold text-gray-900 mb-4">Características</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div v-for="feature in property.features" :key="feature"
                class="flex items-center gap-2 text-sm text-gray-700">
                <div class="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 :size="12" class="text-blue-600" />
                </div>
                {{ feature }}
              </div>
            </div>
          </div>

          <!-- Owner info -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 class="font-['DM_Sans'] font-bold text-gray-900 mb-4">Publicado por</h2>
            <div class="flex items-center gap-4">
              <img :src="property.ownerAvatar" :alt="property.ownerName" class="w-12 h-12 rounded-full object-cover" />
              <div>
                <p class="font-semibold text-gray-900">{{ property.ownerName }}</p>
                <p class="text-gray-500 text-sm">Proprietário verificado</p>
              </div>
              <div class="ml-auto flex items-center gap-2">
                <a :href="`tel:${property.ownerPhone}`">
                  <Button variant="outline" size="sm" class="border-gray-200 flex items-center gap-2">
                    <Phone :size="13" />
                    {{ property.ownerPhone }}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Sticky sidebar -->
        <aside class="hidden lg:block w-80 shrink-0 sticky top-20">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div>
              <p class="font-['DM_Sans'] text-2xl font-bold text-blue-700">
                {{ formatPrice(property.price, property.priceUnit) }}
              </p>
              <div v-if="property.verified" class="flex items-center gap-1 text-green-600 text-xs font-medium mt-1">
                <Shield :size="12" />
                Documentação verificada
              </div>
            </div>

            <div class="space-y-3">
              <RouterLink :to="`/chat?property=${property.id}&owner=${property.ownerId}`" class="block">
                <Button
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-2">
                  <MessageCircle :size="16" />
                  Falar com o proprietário
                </Button>
              </RouterLink>
              <Button variant="outline"
                class="w-full border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold rounded-xl flex items-center gap-2"
                @click="showScheduleModal = true">
                <Calendar :size="16" />
                Agendar visita
              </Button>
            </div>

            <div class="border-t border-gray-100 pt-4 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Tipo</span>
                <span class="font-medium text-gray-900 capitalize">{{ property.type }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Finalidade</span>
                <span class="font-medium text-gray-900 capitalize">{{ property.listingType === 'venda' ? 'Venda' :
                  'Arrendamento' }}</span>
              </div>
              <div v-if="property.area" class="flex justify-between text-sm">
                <span class="text-gray-500">Área</span>
                <span class="font-medium text-gray-900">{{ property.area }} m²</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Publicado em</span>
                <span class="font-medium text-gray-900">
                  {{ new Date(property.publishedAt).toLocaleDateString('pt-AO', {
                    day: '2-digit', month: 'short', year:
                  'numeric' }) }}
                </span>
              </div>
            </div>

            <!-- Owner mini card -->
            <div class="border-t border-gray-100 pt-4">
              <div class="flex items-center gap-3">
                <img :src="property.ownerAvatar" :alt="property.ownerName" class="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ property.ownerName }}</p>
                  <p class="text-xs text-gray-500">Proprietário</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Mobile sticky CTA -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 z-40">
        <RouterLink :to="`/chat?property=${property.id}`" class="flex-1">
          <Button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2">
            <MessageCircle :size="15" />
            Chat
          </Button>
        </RouterLink>
        <Button variant="outline" class="flex-1 border-blue-200 text-blue-700 font-semibold flex items-center gap-2"
          @click="showScheduleModal = true">
          <Calendar :size="15" />
          Agendar visita
        </Button>
      </div>

      <!-- Similar properties -->
      <section v-if="similar.length > 0" class="mt-12">
        <h2 class="font-['DM_Sans'] text-xl font-bold text-gray-900 mb-5">Imóveis semelhantes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <PropertyCard v-for="p in similar" :key="p.id" :property="p" />
        </div>
      </section>
    </div>

    <!-- Property not found -->
    <div v-else class="max-w-7xl mx-auto px-4 lg:px-8 py-16 text-center">
      <h2 class="font-['DM_Sans'] text-2xl font-bold text-gray-900 mb-4">Imóvel não encontrado</h2>
      <Button @click="router.push('/pesquisa')" class="bg-blue-600 text-white">
        Ver todos os imóveis
      </Button>
    </div>

    <!-- Schedule Visit Modal -->
    <div v-if="showScheduleModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="showScheduleModal = false" />
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-['DM_Sans'] font-bold text-gray-900 text-lg">Agendar Visita</h3>
          <button @click="showScheduleModal = false" class="p-1 hover:bg-gray-100 rounded-lg">
            <X :size="18" class="text-gray-500" />
          </button>
        </div>

        <div class="mb-4 p-3 bg-blue-50 rounded-xl">
          <p class="text-sm font-semibold text-blue-800">{{ property?.title }}</p>
          <p class="text-xs text-blue-600 mt-0.5 flex items-center gap-1">
            <MapPin :size="10" />{{ property?.location }}
          </p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Nome completo *</label>
            <input type="text" v-model="visitName" placeholder="O seu nome"
              class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
            <input type="tel" v-model="visitPhone" placeholder="+244 9XX XXX XXX"
              class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Data *</label>
              <input type="date" v-model="visitDate" :min="new Date().toISOString().split('T')[0]"
                class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Hora *</label>
              <select v-model="visitTime"
                class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                <option value="">Seleccionar</option>
                <option v-for="t in times" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <Button variant="outline" @click="showScheduleModal = false" class="flex-1 border-gray-200">
            Cancelar
          </Button>
          <Button @click="handleScheduleVisit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            Confirmar visita
          </Button>
        </div>
      </div>
    </div>

    <div class="pb-20 lg:pb-0">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  MapPin, Bed, Bath, Square, Car, Shield, ChevronLeft,
  ChevronRight, MessageCircle, Calendar, Phone, Share2,
  Heart, CheckCircle2, X
} from 'lucide-vue-next'

import Footer from '@/components/Footer.vue'
import PropertyCard from '@/components/PropertyCard.vue'
import { PROPERTIES, formatPrice } from '@/lib/mockData'

const route = useRoute()
const router = useRouter()

const currentImage = ref(0)
const showScheduleModal = ref(false)
const visitDate = ref('')
const visitTime = ref('')
const visitName = ref('')
const visitPhone = ref('')
const saved = ref(false)

const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

const property = computed(() => {
  return PROPERTIES.find(p => p.id === route.params.id)
})

const similar = computed(() => {
  if (!property.value) return []
  return PROPERTIES.filter(p => p.id !== property.value.id && p.type === property.value.type).slice(0, 4)
})

const badgeClass = (badge) => {
  const classes = {
    Venda: 'bg-blue-600 text-white',
    Arrendar: 'bg-orange-500 text-white',
    Novo: 'bg-green-600 text-white',
    Comercial: 'bg-purple-600 text-white',
    Destaque: 'bg-rose-500 text-white',
    Terreno: 'bg-amber-500 text-white'
  }
  return classes[badge] || 'bg-amber-500 text-white'
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
}

const handleScheduleVisit = () => {
  if (!visitDate.value || !visitTime.value || !visitName.value) return
  showScheduleModal.value = false
  visitDate.value = ''
  visitTime.value = ''
  visitName.value = ''
  visitPhone.value = ''
}
</script>
