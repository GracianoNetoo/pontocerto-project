<template>
  <div class="bg-[#F5F5F4]">
    <!-- Hero Section -->
    <section class="max-w-9xl mx-auto px-4 lg:px-8 pt-10 pb-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Left: Text + Search -->
        <div class="animate-fade-in-up">
          

          <!-- Headline -->
          <h1 class="font-['DM_Sans'] text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] mb-4">
            Encontre casas,<br />
            terrenos e espaços<br />
            comerciais com<br />
            <span class="text-blue-700">confiança.</span>
          </h1>

          <p class="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
            Uma plataforma moderna para pesquisar imóveis, falar com proprietários, agendar visitas e publicar anúncios
            em Angola.
          </p>

          <!-- Search Bar -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 mb-4">
            <div class="flex flex-col sm:flex-row gap-2">
              <!-- Location input -->
              <div class="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin :size="15" class="text-gray-400 shrink-0" />
                <input type="text" v-model="searchQuery" placeholder="Cidade, bairro ou tipo de imóvel"
                  @keydown="handleKeyDown"
                  class="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none min-w-0" />
              </div>

              <!-- Type select -->
              <select v-model="propertyType"
                class="px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600 outline-none cursor-pointer">
                <option value="">Tipo de imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
                <option value="villa">Villa</option>
              </select>

              <!-- Price select -->
              <select v-model="priceRange"
                class="px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600 outline-none cursor-pointer">
                <option value="">Faixa de preço</option>
                <option value="0-50m">Até 50M AOA</option>
                <option value="50m-200m">50M - 200M AOA</option>
                <option value="200m-500m">200M - 500M AOA</option>
                <option value="500m+">Acima de 500M AOA</option>
              </select>

              <Button @click="handleSearch"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-2 rounded-xl flex items-center gap-2 shrink-0">
                <Search :size="15" />
                Pesquisar
              </Button>
            </div>
          </div>

          <!-- Quick filters -->
          <div class="flex flex-wrap gap-2">
            <button v-for="f in quickFilters" :key="f.value"
              @click="activeFilter = activeFilter === f.value ? '' : f.value" :class="[
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all border',
                activeFilter === f.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700'
              ]">
              {{ f.label }}
            </button>
          </div>
        </div>

        <!-- Right: Featured property card -->
        <div class="animate-fade-in-up">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between px-5 pt-5 pb-3">
              <div>
                <h3 class="font-['DM_Sans'] font-bold text-gray-900 text-lg">{{ featuredHero.title }}</h3>
                <p class="text-gray-400 text-xs mt-0.5">Destaque da semana</p>
              </div>
              <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                Venda
              </span>
            </div>

            <!-- Image -->
            <div class="mx-5 rounded-xl overflow-hidden aspect-video bg-gray-100">
              <img :src="featuredHero.images[0]" :alt="featuredHero.title" class="w-full h-full object-cover" />
            </div>

            <!-- Meta -->
            <div class="px-5 py-3 flex items-center gap-4 text-gray-500 text-xs border-b border-gray-50">
              <span>{{ featuredHero.bedrooms }} quartos</span>
              <span>{{ featuredHero.area }} m²</span>
              <span>Vista mar</span>
            </div>

            <!-- Price + CTA -->
            <div class="px-5 py-4 flex items-center justify-between">
              <div>
                <p class="font-['DM_Sans'] text-2xl font-bold text-blue-700">
                  {{ formatPrice(featuredHero.price) }}
                </p>
                <p class="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                  <MapPin :size="10" />
                  {{ featuredHero.location }} · documentação verificada
                </p>
              </div>
              <RouterLink :to="`/imovel/${featuredHero.id}`">
                <Button class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl px-4">
                  Ver detalhes
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats bar -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      <div
        class="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-5 flex flex-col sm:flex-row items-center justify-around gap-6">
        <div v-for="(stat, i) in stats" :key="i" class="text-center">
          <p class="font-['DM_Sans'] text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          <p class="text-gray-500 text-sm mt-0.5">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Featured Properties -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <p class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">Explorar</p>
          <h2 class="font-['DM_Sans'] text-2xl font-bold text-gray-900">Imóveis em destaque</h2>
        </div>
        <RouterLink to="/pesquisa">
          <button
            class="text-blue-600 text-sm font-semibold hover:text-blue-800 flex items-center gap-1 transition-colors">
            Ver todos os anúncios
            <ChevronRight :size="15" />
          </button>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div v-for="(property, i) in featuredProperties" :key="property.id"
          :class="['animate-fade-in-up', `animate-fade-in-up-delay-${i + 1}`]">
          <PropertyCard :property="property" />
        </div>
      </div>
    </section>

    <!-- Why PontoCerto -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Search :size="18" class="text-blue-600" />
          </div>
          <h3 class="font-['DM_Sans'] font-bold text-gray-900 mb-2">Pesquisa rápida</h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            Encontre o imóvel ideal em segundos com filtros avançados por localização, preço e tipo.
          </p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
            <Shield :size="18" class="text-green-600" />
          </div>
          <h3 class="font-['DM_Sans'] font-bold text-gray-900 mb-2">Anúncios verificados</h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            Todos os anúncios passam por verificação de documentação para garantir segurança nas transações.
          </p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
            <Users :size="18" class="text-purple-600" />
          </div>
          <h3 class="font-['DM_Sans'] font-bold text-gray-900 mb-2">Contacto directo</h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            Fale directamente com proprietários via chat integrado. Sem intermediários desnecessários.
          </p>
        </div>
      </div>
    </section>

    <!-- More properties -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-['DM_Sans'] text-2xl font-bold text-gray-900">Mais imóveis disponíveis</h2>
        <RouterLink to="/pesquisa">
          <button class="text-blue-600 text-sm font-semibold hover:text-blue-800 flex items-center gap-1">
            Ver todos
            <ChevronRight :size="15" />
          </button>
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <PropertyCard v-for="property in moreProperties" :key="property.id" :property="property" />
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div
        class="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p class="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">
            Publish with confidence
          </p>
          <h2 class="font-['DM_Sans'] text-2xl font-bold text-gray-900 mb-2">
            Publique o seu imóvel e receba contactos qualificados
          </h2>
          <p class="text-gray-500 text-sm max-w-lg">
            Crie anúncios para venda ou arrendamento, carregue imagens e fale com interessados numa experiência
            profissional e clara.
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <RouterLink to="/publicar">
            <Button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-xl">
              Começar anúncio
            </Button>
          </RouterLink>
          <RouterLink to="/dashboard">
            <Button variant="outline" class="font-semibold px-6 rounded-xl border-gray-200">
              Ver dashboard
            </Button>
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Search, MapPin, ChevronRight, Shield, Zap, Users } from 'lucide-vue-next'
import PropertyCard from '@/components/PropertyCard.vue'
import { PROPERTIES, formatPrice } from '@/lib/mockData'

const router = useRouter()

const searchQuery = ref('')
const propertyType = ref('')
const priceRange = ref('')
const activeFilter = ref('')

const featuredHero = PROPERTIES[0] || {} 
const featuredProperties = PROPERTIES.slice(0, 4)
const moreProperties = PROPERTIES.slice(4, 8)

const quickFilters = [
  { label: 'Casas', value: 'casa' },
  { label: 'Terrenos', value: 'terreno' },
  { label: 'Comercial', value: 'comercial' },
  { label: 'Comprar', value: 'venda' },
  { label: 'Arrendar', value: 'arrendar' }
]

const stats = [
  { value: '2.400+', label: 'Imóveis listados' },
  { value: '1.200+', label: 'Proprietários activos' },
  { value: '18', label: 'Cidades em Angola' }
]

const handleSearch = () => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.set('q', searchQuery.value)
  if (propertyType.value) params.set('tipo', propertyType.value)
  if (priceRange.value) params.set('preco', priceRange.value)
  if (activeFilter.value) params.set('categoria', activeFilter.value)
  router.push(`/pesquisa?${params.toString()}`)
}

const handleKeyDown = (e) => {
  if (e.key === 'Enter') handleSearch()
}
</script>
