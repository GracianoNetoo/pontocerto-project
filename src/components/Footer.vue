<template>
  <footer class="bg-gray-900 text-gray-400 mt-16">
    <div class="max-w-[1280px] mx-auto px-4 lg:px-8 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-1 mb-3">
            <span class="font-['DM_Sans'] text-lg font-bold text-white">PontoCerto</span>
            <div class="w-2 h-2 rounded-full bg-blue-500 mb-0.5" />
          </div>
          <p class="text-sm leading-relaxed text-gray-500">
            Marketplace imobiliário em Angola. Encontre casas, terrenos e espaços comerciais com confiança.
          </p>
        </div>

        <!-- Imóveis -->
        <div>
          <h4 class="text-white text-sm font-semibold mb-4">Imóveis</h4>
          <ul class="space-y-2 text-sm">
            <li><RouterLink to="/pesquisa?tipo=venda" class="hover:text-white transition-colors">Comprar</RouterLink></li>
            <li><RouterLink to="/pesquisa?tipo=arrendar" class="hover:text-white transition-colors">Arrendar</RouterLink></li>
            <li><RouterLink to="/pesquisa?categoria=comercial" class="hover:text-white transition-colors">Comercial</RouterLink></li>
            <li><RouterLink to="/pesquisa?categoria=terreno" class="hover:text-white transition-colors">Terrenos</RouterLink></li>
          </ul>
        </div>

        <!-- Plataforma -->
        <div>
          <h4 class="text-white text-sm font-semibold mb-4">Plataforma</h4>
          <ul class="space-y-2 text-sm">
            <li><RouterLink to="/publicar" class="hover:text-white transition-colors">Publicar imóvel</RouterLink></li>
            <li><RouterLink to="/dashboard" class="hover:text-white transition-colors">Dashboard</RouterLink></li>
            <li><RouterLink to="/chat" class="hover:text-white transition-colors">Mensagens</RouterLink></li>
          </ul>
        </div>

        <!-- Empresa -->
        <div>
          <h4 class="text-white text-sm font-semibold mb-4">Empresa</h4>
          <ul class="space-y-2 text-sm">
            <li><span class="hover:text-white transition-colors cursor-pointer">Sobre nós</span></li>
            <li><span class="hover:text-white transition-colors cursor-pointer">Contacto</span></li>
            <li><span class="hover:text-white transition-colors cursor-pointer">Termos de uso</span></li>
            <li><span class="hover:text-white transition-colors cursor-pointer">Privacidade</span></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-600">
          © 2026 PontoCerto. Todos os direitos reservados. Luanda, Angola.
        </p>
        <p class="text-xs text-gray-600">
          Marketplace Imobiliário em Angola
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
