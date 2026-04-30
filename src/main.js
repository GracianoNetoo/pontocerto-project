import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import './style/style.css' // Se você tiver um arquivo de CSS/Tailwind

const app = createApp(App)
app.use(router) // Ativa o roteador
app.mount('#app')
