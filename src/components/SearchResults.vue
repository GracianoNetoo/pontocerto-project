<template>
  <div class="bg-[#F5F5F4]">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      <!-- Top bar -->
      <div class="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 class="font-['DM_Sans'] text-xl font-bold text-gray-900">
            {{ initialQuery ? `Resultados para "${initialQuery}"` : 'Todos os imóveis' }}
          </h1>
          <p class="text-gray-500 text-sm mt-0.5">
            {{ filteredProperties.length }} imóveis encontrados
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Mobile filter toggle -->
          <Button variant="outline" size="sm" @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden flex items-center gap-2 border-gray-200">
            <SlidersHorizontal :size="14" />
            Filtros
            <span v-if="activeFilterCount > 0"
              class="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {{ activeFilterCount }}
            </span>
          </Button>

          <!-- Sort -->
          <div class="relative">
            <select v-model="sortBy"
              class="appearance-none pl-3 pr-8 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg outline-none cursor-pointer hover:border-gray-300">
              <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
            <ChevronDown :size="14"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <!-- View mode -->
          <div class="hidden sm:flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            <button @click="viewMode = 'grid'"
              :class="['p-1.5 rounded transition-colors', viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700']">
              <Grid3X3 :size="14" />
            </button>
            <button @click="viewMode = 'list'"
              :class="['p-1.5 rounded transition-colors', viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700']">
              <List :size="14" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex gap-6">
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:block w-64 shrink-0">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
            <SidebarContent />
          </div>
        </aside>

        <!-- Mobile Sidebar overlay -->
        <div v-if="sidebarOpen" class="lg:hidden fixed inset-0 z-50 flex">
          <div class="absolute inset-0 bg-black/40" @click="sidebarOpen = false" />
          <div class="relative bg-white w-80 max-w-full h-full overflow-y-auto p-5 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-['DM_Sans'] font-bold text-gray-900">Filtros</h3>
              <button @click="sidebarOpen = false" class="p-1 hover:bg-gray-100 rounded">
                <X :size="18" />
              </button>
            </div>
            <SidebarContent />
            <div class="mt-6">
              <Button @click="sidebarOpen = false" class="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Ver {{ filteredProperties.length }} imóveis
              </Button>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <main class="flex-1 min-w-0">
          <!-- Empty state -->
          <div v-if="filteredProperties.length === 0"
            class="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal :size="24" class="text-gray-400" />
            </div>
            <h3 class="font-['DM_Sans'] font-bold text-gray-900 mb-2">Nenhum imóvel encontrado</h3>
            <p class="text-gray-500 text-sm mb-4">Tente ajustar os filtros ou pesquisar por outra localização.</p>
            <Button @click="clearFilters" variant="outline" class="border-gray-200">
              Limpar filtros
            </Button>
          </div>

          <!-- Grid view -->
          <div v-else
            :class="viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'">
            <template v-if="viewMode === 'grid'">
              <PropertyCard v-for="property in filteredProperties" :key="property.id" :property="property" />
            </template>
            <template v-else>
              <ListPropertyCard v-for="property in filteredProperties" :key="property.id" :property="property" />
            </template>
          </div>
        </main>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { SlidersHorizontal, X, ChevronDown, Grid3X3, List } from 'lucide-vue-next'
import PropertyCard from '@/components/PropertyCard.vue'
import { PROPERTIES, Property, formatPrice } from '@/lib/mockData'

const route = useRoute()

const initialQuery = computed(() => route.query.q || '')
const initialTipo = computed(() => route.query.tipo || '')
const initialCategoria = computed(() => route.query.categoria || '')

const sortBy = ref('relevancia')
const viewMode = ref('grid')
const sidebarOpen = ref(false)

const selectedTypes = ref(initialCategoria.value ? [initialCategoria.value] : [])
const selectedListingType = ref(initialTipo.value)
const selectedNeighborhoods = ref([])
const priceRange = ref([0, 600])
const minBedrooms = ref(0)
const verifiedOnly = ref(false)

const sortOptions = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'preco-asc', label: 'Menor preço' },
  { value: 'preco-desc', label: 'Maior preço' },
  { value: 'recente', label: 'Mais recentes' }
]

const propertyTypesList = [
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'villa', label: 'Villa' }
]

const listingTypes = [
  { value: 'venda', label: 'Comprar' },
  { value: 'arrendar', label: 'Arrendar' }
]

const neighborhoods = [
  'Ilha de Luanda', 'Miramar', 'Talatona', 'Alvalade', 'Maianga',
  'Benfica', 'Sambizanga', 'Viana', 'Kilamba', 'Luanda Sul'
]

const filteredProperties = computed(() => {
  let result = [...PROPERTIES]

  // Text search
  if (initialQuery.value) {
    const q = initialQuery.value.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.neighborhood.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q)
    )
  }

  // Listing type
  if (selectedListingType.value) {
    result = result.filter(p => p.listingType === selectedListingType.value)
  }

  // Property types
  if (selectedTypes.value.length > 0) {
    result = result.filter(p => selectedTypes.value.includes(p.type))
  }

  // Neighborhoods
  if (selectedNeighborhoods.value.length > 0) {
    result = result.filter(p => selectedNeighborhoods.value.includes(p.neighborhood))
  }

  // Price range
  result = result.filter(p => {
    const priceM = p.price / 1000000
    return priceM >= priceRange.value[0] && priceM <= priceRange.value[1]
  })

  // Bedrooms
  if (minBedrooms.value > 0) {
    result = result.filter(p => (p.bedrooms || 0) >= minBedrooms.value)
  }

  // Verified only
  if (verifiedOnly.value) {
    result = result.filter(p => p.verified)
  }

  // Sort
  switch (sortBy.value) {
    case 'preco-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'preco-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'recente':
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      break
  }

  return result
})

const activeFilterCount = computed(() => {
  return selectedTypes.value.length +
    selectedNeighborhoods.value.length +
    (selectedListingType.value ? 1 : 0) +
    (verifiedOnly.value ? 1 : 0) +
    (minBedrooms.value > 0 ? 1 : 0) +
    (priceRange.value[0] > 0 || priceRange.value[1] < 600 ? 1 : 0)
})

const toggleType = (value) => {
  const index = selectedTypes.value.indexOf(value)
  if (index === -1) {
    selectedTypes.value.push(value)
  } else {
    selectedTypes.value.splice(index, 1)
  }
}

const toggleNeighborhood = (value) => {
  const index = selectedNeighborhoods.value.indexOf(value)
  if (index === -1) {
    selectedNeighborhoods.value.push(value)
  } else {
    selectedNeighborhoods.value.splice(index, 1)
  }
}

const clearFilters = () => {
  selectedTypes.value = []
  selectedListingType.value = ''
  selectedNeighborhoods.value = []
  priceRange.value = [0, 600]
  minBedrooms.value = 0
  verifiedOnly.value = false
}

// Sidebar content component
const SidebarContent = {
  setup() {
    return () => (
      h('div', { class: 'space-y-6' }, [
        // Header
        h('div', { class: 'flex items-center justify-between' }, [
          h('h3', { class: 'font-[\'DM_Sans\'] font-bold text-gray-900' }, 'Filtros'),
          activeFilterCount.value > 0 ? h('button', {
            onClick: clearFilters,
            class: 'text-xs text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1'
          }, [h(X, { size: 12 }), `Limpar (${activeFilterCount.value})`]) : null
        ]),

        // Listing type
        h('div', [
          h('h4', { class: 'text-sm font-semibold text-gray-700 mb-3' }, 'Finalidade'),
          h('div', { class: 'flex gap-2' },
            listingTypes.map(lt =>
              h('button', {
                key: lt.value,
                onClick: () => { selectedListingType.value = selectedListingType.value === lt.value ? '' : lt.value },
                class: [
                  'flex-1 py-2 text-sm font-medium rounded-lg border transition-all',
                  selectedListingType.value === lt.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                ]
              }, lt.label)
            )
          )
        ]),

        // Property type
        h('div', [
          h('h4', { class: 'text-sm font-semibold text-gray-700 mb-3' }, 'Tipo de imóvel'),
          h('div', { class: 'space-y-2' },
            propertyTypesList.map(pt =>
              h('label', { key: pt.value, class: 'flex items-center gap-3 cursor-pointer group' }, [
                h('div', {
                  onClick: () => toggleType(pt.value),
                  class: [
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer',
                    selectedTypes.value.includes(pt.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'
                  ]
                }, selectedTypes.value.includes(pt.value) ? h('svg', { class: 'w-2.5 h-2.5 text-white', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 3, d: 'M5 13l4 4L19 7' })
                ]) : null),
                h('span', {
                  onClick: () => toggleType(pt.value),
                  class: 'text-sm text-gray-700 group-hover:text-gray-900 cursor-pointer'
                }, pt.label)
              ])
            )
          )
        ]),

        // Price range
        h('div', [
          h('h4', { class: 'text-sm font-semibold text-gray-700 mb-3' }, 'Preço (AOA)'),
          h('div', { class: 'px-1' }, [
            h(Slider, {
              min: 0,
              max: 600,
              step: 10,
              value: priceRange.value,
              onUpdateValue: (v) => { priceRange.value = v },
              class: 'mb-3'
            }),
            h('div', { class: 'flex justify-between text-xs text-gray-500' }, [
              h('span', `${priceRange.value[0]}M AOA`),
              h('span', priceRange.value[1] >= 600 ? '600M+ AOA' : `${priceRange.value[1]}M AOA`)
            ])
          ])
        ]),

        // Bedrooms
        h('div', [
          h('h4', { class: 'text-sm font-semibold text-gray-700 mb-3' }, 'Quartos mínimos'),
          h('div', { class: 'flex gap-2' },
            [0, 1, 2, 3, 4].map(n =>
              h('button', {
                key: n,
                onClick: () => { minBedrooms.value = n },
                class: [
                  'w-9 h-9 rounded-lg text-sm font-medium border transition-all',
                  minBedrooms.value === n ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                ]
              }, n === 0 ? 'T.' : `${n}+`)
            )
          )
        ]),

        // Neighborhood
        h('div', [
          h('h4', { class: 'text-sm font-semibold text-gray-700 mb-3' }, 'Bairro / Zona'),
          h('div', { class: 'space-y-2 max-h-48 overflow-y-auto pr-1' },
            neighborhoods.map(n =>
              h('label', { key: n, class: 'flex items-center gap-3 cursor-pointer group' }, [
                h('div', {
                  onClick: () => toggleNeighborhood(n),
                  class: [
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer',
                    selectedNeighborhoods.value.includes(n) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'
                  ]
                }, selectedNeighborhoods.value.includes(n) ? h('svg', { class: 'w-2.5 h-2.5 text-white', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 3, d: 'M5 13l4 4L19 7' })
                ]) : null),
                h('span', {
                  onClick: () => toggleNeighborhood(n),
                  class: 'text-sm text-gray-700 group-hover:text-gray-900 cursor-pointer'
                }, n)
              ])
            )
          )
        ]),

        // Verified only
        h('div', [
          h('label', { class: 'flex items-center gap-3 cursor-pointer group' }, [
            h('div', {
              onClick: () => { verifiedOnly.value = !verifiedOnly.value },
              class: [
                'w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer',
                verifiedOnly.value ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'
              ]
            }, verifiedOnly.value ? h('svg', { class: 'w-2.5 h-2.5 text-white', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
              h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 3, d: 'M5 13l4 4L19 7' })
            ]) : null),
            h('span', {
              onClick: () => { verifiedOnly.value = !verifiedOnly.value },
              class: 'text-sm text-gray-700 group-hover:text-gray-900 cursor-pointer'
            }, 'Apenas verificados')
          ])
        ])
      ])
    )
  }
}

// List property card component
const ListPropertyCard = {
  props: ['property'],
  setup(props) {
    const getBadgeClass = (badge) => {
      const classes = {
        Venda: 'bg-blue-100 text-blue-700',
        Arrendar: 'bg-orange-100 text-orange-700',
        Novo: 'bg-green-100 text-green-700',
        Comercial: 'bg-purple-100 text-purple-700'
      }
      return classes[badge] || 'bg-amber-100 text-amber-700'
    }

    return () => (
      h(RouterLink, { to: `/imovel/${props.property.id}`, class: 'block' }, () => (
        h('div', { class: 'bg-white rounded-xl border border-gray-100 overflow-hidden flex gap-0 property-card cursor-pointer' }, [
          h('div', { class: 'w-48 shrink-0 aspect-[4/3] overflow-hidden bg-gray-100' }, [
            h('img', {
              src: props.property.images[0],
              alt: props.property.title,
              class: 'w-full h-full object-cover'
            })
          ]),
          h('div', { class: 'flex-1 p-4 flex flex-col justify-between' }, [
            h('div', [
              h('div', { class: 'flex items-start justify-between gap-2 mb-1' }, [
                h('h3', { class: 'font-[\'DM_Sans\'] font-semibold text-gray-900 text-sm' }, props.property.title),
                h('div', { class: 'flex gap-1.5 shrink-0' },
                  props.property.badges.slice(0, 2).map(b =>
                    h('span', { key: b, class: `text-xs font-semibold px-2 py-0.5 rounded-full ${getBadgeClass(b)}` }, b)
                  )
                )
              ]),
              h('p', { class: 'text-gray-500 text-xs mb-2' }, props.property.location),
              h('p', { class: 'text-gray-600 text-xs line-clamp-2' }, props.property.description)
            ]),
            h('div', { class: 'flex items-center justify-between mt-3' }, [
              h('p', { class: 'font-[\'DM_Sans\'] text-lg font-bold text-blue-700' }, formatPrice(props.property.price, props.property.priceUnit)),
              h('div', { class: 'flex items-center gap-3 text-gray-400 text-xs' }, [
                props.property.bedrooms ? h('span', {}, `${props.property.bedrooms} qts`) : null,
                props.property.bathrooms ? h('span', {}, `${props.property.bathrooms} wc`) : null,
                props.property.area ? h('span', {}, `${props.property.area} m²`) : null
              ])
            ])
          ])
        ])
      ))
    )
  }
}
</script>

<script>
// Import h from vue
import { h } from 'vue'
</script>
