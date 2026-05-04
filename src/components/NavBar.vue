<template>
  <header class="top-nav bg-white border-b border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-1.5 group">
          <div class="flex items-center gap-1">
            <span class="font-['DM_Sans'] text-xl font-bold text-gray-900 tracking-tight">
              PontoCerto
            </span>
            <div class="w-2 h-2 rounded-full bg-blue-600 mb-0.5" />
          </div>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <RouterLink v-for="link in navLinks" :key="link.href" :to="link.href" :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
            isActive(link.href)
              ? 'text-blue-700 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          ]">
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Right actions -->
        <div class="hidden md:flex items-center gap-3">
          <RouterLink to="/dashboard">
            <Button variant="ghost" size="sm" class="text-gray-600 font-medium">
              Entrar
            </Button>
          </RouterLink>
          <RouterLink to="/publicar">
            <Button size="sm" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4">
              Publicar imóvel
            </Button>
          </RouterLink>
        </div>

        <!-- Mobile menu toggle -->
        <button class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" @click="mobileOpen = !mobileOpen"
          aria-label="Menu">
          <X v-if="mobileOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2">
      <RouterLink v-for="link in navLinks" :key="link.href" :to="link.href"
        class="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        @click="mobileOpen = false">
        {{ link.label }}
      </RouterLink>
      <div class="pt-2 border-t border-gray-100 flex flex-col gap-2">
        <RouterLink to="/dashboard" @click="mobileOpen = false">
          <Button variant="ghost" size="sm" class="w-full justify-start text-gray-600">
            Entrar
          </Button>
        </RouterLink>
        <RouterLink to="/publicar" @click="mobileOpen = false">
          <Button size="sm" class="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Publicar imóvel
          </Button>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Comprar', href: '/pesquisa?tipo=venda' },
  { label: 'Arrendar', href: '/pesquisa?tipo=arrendar' },
  { label: 'Comercial', href: '/pesquisa?categoria=comercial' }
]

const isActive = (href) => {
  const path = href.split('?')[0]
  return route.path === path
}
</script>
