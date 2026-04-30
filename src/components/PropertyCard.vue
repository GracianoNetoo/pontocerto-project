<template>
  <RouterLink :to="`/imovel/${property.id}`">
    <div :class="['property-card bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer', className]">
      <!-- Image -->
      <div class="relative aspect-4/3 overflow-hidden bg-gray-100">
        <img
          :src="property.images?.[0] || 'https://placehold.co/600x400?text=Sem+Foto'"
          :alt="property.title"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div class="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <Badge
v-for="badge in (property.badges || [property.type]).slice(0, 2)"
    :key="badge"
    :type="badge"
  />
</div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <!-- Title -->
        <h3 class="font-['DM_Sans'] font-semibold text-gray-900 text-sm leading-snug mb-1 truncate">
          {{ property.title }}
        </h3>

        <!-- Location -->
        <div class="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <MapPin :size="11" />
          <span class="truncate">{{ property.location }}</span>
        </div>

        <!-- Meta info -->
        <div class="flex items-center gap-3 text-gray-500 text-xs mb-3">
          <span v-if="property.bedrooms" class="flex items-center gap-1">
            <Bed :size="11" />
            {{ property.bedrooms }} qts
          </span>
          <span v-if="property.bathrooms" class="flex items-center gap-1">
            <Bath :size="11" />
            {{ property.bathrooms }} wc
          </span>
          <span v-if="property.area" class="flex items-center gap-1">
            <Square :size="11" />
            {{ property.area }} m²
          </span>
          <span v-if="!property.bedrooms && !property.bathrooms && !property.area" class="text-gray-400 italic">
            Comercial
          </span>
        </div>

        <!-- Price + CTA -->
        <div class="flex items-center justify-between">
          <div>
            <p class="price-display text-lg font-bold text-blue-700 font-['DM_Sans'] leading-tight">
              {{ formatPrice(property.price, property.priceUnit) }}
            </p>
          </div>
          <span class="text-blue-600 text-xs font-semibold hover:text-blue-800 transition-colors">
            Ver detalhes →
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { MapPin, Bed, Bath, Square } from 'lucide-vue-next'
import { formatPrice } from '@/lib/mockData'

const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})


const Badge = ({ type }) => {
  const styles = {
    Venda: 'bg-blue-100 text-blue-700',
    Arrendar: 'bg-orange-100 text-orange-700',
    Novo: 'bg-green-100 text-green-700',
    Comercial: 'bg-purple-100 text-purple-700',
    Terreno: 'bg-amber-100 text-amber-700',
    Destaque: 'bg-rose-100 text-rose-700'
  }
  return h('span', {
    class: `text-xs font-semibold px-2 py-0.5 rounded-full ${styles[type] || 'bg-gray-100 text-gray-600'}`
  }, type)
}
</script>
