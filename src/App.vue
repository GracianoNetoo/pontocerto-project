<script setup>
// Importando os componentes globais e estruturais
import Navbar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import PropertyCard from '@/components/PropertyCard.vue'
/**
 * Nota: Como você tem um componente "Boundary" (provavelmente um Error Boundary), 
 * ele deve envolver a parte principal para capturar erros de renderização.
 * * Se você estiver usando Vue Router, o <RouterView /> seria usado no lugar
 * do <HomeView /> para alternar entre Dashboard, SearchResults, etc.
 */
import Boundary from '@/components/Boundary.vue';
import HomeView from '@/components/HomeView.vue'; // Exemplo de visualização inicial
</script>

<template>
  <div class="app-container">
    <Navbar />

    <main class="main-content">
      <Boundary>
        <HomeView />
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
}

.main-content {
  flex: 1; /* Faz o conteúdo ocupar o espaço restante entre Header e Footer */
  padding: 20px;
}
</style>