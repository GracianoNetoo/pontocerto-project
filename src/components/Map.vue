<template>
  <div ref="mapContainer" :class="cn('w-full h-[500px]', className)" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  className: String,
  initialCenter: {
    type: Object,
    default: () => ({ lat: 37.7749, lng: -122.4194 })
  },
  initialZoom: {
    type: Number,
    default: 12
  },
  onMapReady: Function
})

const mapContainer = ref(null)
const map = ref(null)

const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY
const FORGE_BASE_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL || 'https://forge.butterfly-effect.dev'
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`

function loadMapScript() {
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`
    script.async = true
    script.crossOrigin = 'anonymous'
    script.onload = () => {
      resolve(null)
      script.remove()
    }
    script.onerror = () => {
      console.error('Failed to load Google Maps script')
    }
    document.head.appendChild(script)
  })
}

const init = async () => {
  await loadMapScript()
  if (!mapContainer.value) {
    console.error('Map container not found')
    return
  }
  map.value = new window.google.maps.Map(mapContainer.value, {
    zoom: props.initialZoom,
    center: props.initialCenter,
    mapTypeControl: true,
    fullscreenControl: true,
    zoomControl: true,
    streetViewControl: true,
    mapId: 'DEMO_MAP_ID'
  })
  if (props.onMapReady) {
    props.onMapReady(map.value)
  }
}

onMounted(() => {
  init()
})
</script>
