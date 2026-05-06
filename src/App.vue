<script setup>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import FloatingSearch from '@/components/FloatingSearch.vue'
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="app-container">
    <NavBar />

    <main class="main-content">
      <RouterView :key="$route.fullPath" />
    </main>

    <Footer />
    <FloatingSearch />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f4;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
