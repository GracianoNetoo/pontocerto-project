import { createRouter, createWebHistory } from 'vue-router'

// 1. Importe as suas visualizações principais
// Nota: Se os arquivos estiverem em src/components, o caminho é este:
import HomeView from '@/components/HomeView.vue'
import Dashboard from '@/components/Dashboard.vue'
import SearchResults from '../components/SearchResults.vue'
import PropertyDetails from '@/components/PropertyDetails.vue'
import NotFound from '@/components/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pesquisa',
    name: 'search',
    component: SearchResults
  },
  {
    path: '/imovel/:id',
    name: 'property-details',
    component: PropertyDetails,
    props: true
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  // Rota para páginas não encontradas (404)
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Garante que ao mudar de página, o scroll volte para o topo
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router