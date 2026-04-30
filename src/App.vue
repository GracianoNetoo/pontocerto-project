<script setup>
import Navbar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Boundary from '@/components/Boundary.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />

    <main class="main-content">
      <Boundary>
        <RouterView />
      </Boundary>
    </main>

    <Footer />
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
