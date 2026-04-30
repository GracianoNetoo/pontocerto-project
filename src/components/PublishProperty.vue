<template>
  <div class="min-h-screen bg-[#F5F5F4]">
    <Navbar />

    <!-- Success state -->
    <div v-if="submitted" class="max-w-[600px] mx-auto px-4 py-16 text-center">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 :size="32" class="text-green-600" />
        </div>
        <h2 class="font-['DM_Sans'] text-2xl font-bold text-gray-900 mb-3">
          Imóvel publicado com sucesso!
        </h2>
        <p class="text-gray-500 text-sm mb-6 leading-relaxed">
          O seu anúncio foi submetido para revisão. Receberá uma confirmação em breve e o imóvel ficará visível na
          plataforma.
        </p>
        <div class="flex gap-3 justify-center">
          <Button @click="router.push('/dashboard')" class="bg-blue-600 hover:bg-blue-700 text-white">
            Ver no dashboard
          </Button>
          <Button variant="outline" @click="resetForm" class="border-gray-200">
            Publicar outro
          </Button>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div v-else class="max-w-[800px] mx-auto px-4 lg:px-8 py-8">
      <!-- Page header -->
      <div class="mb-8">
        <h1 class="font-['DM_Sans'] text-2xl font-bold text-gray-900 mb-1">Publicar imóvel</h1>
        <p class="text-gray-500 text-sm">Crie o seu anúncio em poucos passos</p>
      </div>

      <!-- Step progress -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div class="flex items-center justify-between">
          <div v-for="(step, i) in steps" :key="step.id" class="flex items-center flex-1">
            <div class="flex flex-col items-center">
              <div :class="[
                'w-9 h-9 rounded-full flex items-center justify-center transition-all',
                currentStep > step.id ? 'bg-green-500 text-white' :
                  currentStep === step.id ? 'bg-blue-600 text-white' :
                    'bg-gray-100 text-gray-400'
              ]">
                <Check v-if="currentStep > step.id" :size="16" />
                <component v-else :is="step.icon" :size="15" />
              </div>
              <span :class="[
                'text-xs font-medium mt-1.5 hidden sm:block',
                currentStep === step.id ? 'text-blue-700' :
                  currentStep > step.id ? 'text-green-600' :
                    'text-gray-400'
              ]">
                {{ step.label }}
              </span>
            </div>
            <div v-if="i < steps.length - 1"
              :class="['flex-1 h-0.5 mx-2 transition-all', currentStep > step.id ? 'bg-green-400' : 'bg-gray-200']" />
          </div>
        </div>
      </div>

      <!-- Form card -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div class="mb-6">
          <h2 class="font-['DM_Sans'] font-bold text-gray-900 text-lg">
            {{ steps[currentStep - 1].label }}
          </h2>
          <p class="text-gray-500 text-sm mt-0.5">{{ steps[currentStep - 1].description }}</p>
        </div>

        <!-- Step 1: Type -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Tipo de imóvel *</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button v-for="pt in propertyTypes" :key="pt.value" @click="form.propertyType = pt.value" :class="[
                'p-4 rounded-xl border-2 text-left transition-all',
                form.propertyType === pt.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              ]">
                <span class="text-2xl block mb-1">{{ pt.emoji }}</span>
                <span
                  :class="['text-sm font-medium', form.propertyType === pt.value ? 'text-blue-700' : 'text-gray-700']">
                  {{ pt.label }}
                </span>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Finalidade *</label>
            <div class="grid grid-cols-2 gap-3">
              <button v-for="lt in listingTypes" :key="lt.value" @click="form.listingType = lt.value" :class="[
                'p-4 rounded-xl border-2 text-left transition-all',
                form.listingType === lt.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              ]">
                <span
                  :class="['text-sm font-semibold block mb-0.5', form.listingType === lt.value ? 'text-blue-700' : 'text-gray-800']">
                  {{ lt.label }}
                </span>
                <span class="text-xs text-gray-500">{{ lt.desc }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Step 2: Location -->
        <div v-if="currentStep === 2" class="space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Cidade *</label>
              <select v-model="form.city"
                class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                <option v-for="c in angolaCities" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Bairro / Zona *</label>
              <select v-model="form.neighborhood"
                class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                <option value="">Seleccionar bairro</option>
                <option v-for="n in luandaNeighborhoods" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Endereço / Referência</label>
            <input type="text" v-model="form.address" placeholder="Ex: Rua da Missão, próximo ao Shopping Belas"
              class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </div>
          <div class="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
            <p class="font-medium mb-1">Dica de privacidade</p>
            <p class="text-blue-600 text-xs">O endereço exacto só é partilhado com interessados confirmados após o seu
              consentimento.</p>
          </div>
        </div>

        <!-- Step 3: Price -->
        <div v-if="currentStep === 3" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Preço (AOA) *</label>
            <div class="flex gap-3">
              <input type="number" v-model="form.price" placeholder="Ex: 182000000"
                class="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
              <select v-model="form.priceUnit"
                class="px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                <option value="total">Preço total</option>
                <option value="mes">Por mês</option>
              </select>
            </div>
            <p v-if="form.price" class="text-blue-600 text-sm font-semibold mt-2">
              ≈ {{ form.price >= 1000000 ? `${(form.price / 1000000).toFixed(0)}M AOA` : `${(form.price /
                1000).toFixed(0)}k AOA` }}
              {{ form.priceUnit === 'mes' ? '/mês' : '' }}
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Quartos</label>
              <select v-model="form.bedrooms"
                class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                <option value="">—</option>
                <option v-for="n in [1, 2, 3, 4, 5, 6]" :key="n" :value="n">T{{ n }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Casas de banho</label>
              <select v-model="form.bathrooms"
                class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                <option value="">—</option>
                <option v-for="n in [1, 2, 3, 4, 5]" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Área (m²)</label>
              <input type="number" v-model="form.area" placeholder="Ex: 145"
                class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Garagem</label>
              <select v-model="form.garage"
                class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                <option value="">—</option>
                <option v-for="n in [1, 2, 3, 4]" :key="n" :value="n">{{ n }} lugar{{ n > 1 ? 'es' : '' }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Step 4: Images -->
        <div v-if="currentStep === 4" class="space-y-5">
          <div
            class="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-blue-300 transition-colors cursor-pointer"
            @click="() => { }">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Upload :size="20" class="text-blue-500" />
            </div>
            <p class="font-semibold text-gray-700 mb-1">Carregar fotos</p>
            <p class="text-gray-400 text-sm">Arraste e solte ou clique para seleccionar</p>
            <p class="text-gray-400 text-xs mt-2">PNG, JPG até 10MB cada · Máximo 20 fotos</p>
          </div>

          <div class="bg-amber-50 rounded-xl p-4">
            <p class="text-amber-800 text-sm font-medium mb-1">Dicas para melhores resultados</p>
            <ul class="text-amber-700 text-xs space-y-1">
              <li>• Fotografe em luz natural, de preferência de manhã</li>
              <li>• Inclua todas as divisões: sala, quartos, cozinha, casas de banho</li>
              <li>• Adicione fotos do exterior e da vista</li>
              <li>• Imóveis com 8+ fotos recebem 3x mais contactos</li>
            </ul>
          </div>

          <!-- Sample image previews -->
          <div class="grid grid-cols-3 gap-3">
            <div v-for="i in 3" :key="i"
              class="aspect-4/3 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
              <span class="text-gray-300 text-xs">Foto {{ i }}</span>
            </div>
          </div>
        </div>

        <!-- Step 5: Details -->
        <div v-if="currentStep === 5" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Título do anúncio *</label>
            <input type="text" v-model="form.title" placeholder="Ex: Apartamento T3 moderno em Miramar com vista cidade"
              maxlength="80"
              class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
            <p class="text-xs text-gray-400 mt-1 text-right">{{ form.title.length }}/80</p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Descrição *</label>
            <textarea v-model="form.description"
              placeholder="Descreva o imóvel em detalhe: localização, acabamentos, pontos de interesse próximos, condições especiais..."
              rows="5" maxlength="1000"
              class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none" />
            <p class="text-xs text-gray-400 mt-1 text-right">{{ form.description.length }}/1000</p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Características</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="feature in featuresList" :key="feature" @click="toggleFeature(feature)" :class="[
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                form.features.includes(feature) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
              ]">
                {{ feature }}
              </button>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 class="font-semibold text-gray-700 text-sm mb-3">Resumo do anúncio</h4>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-500">Tipo:</span>
                <span class="font-medium capitalize">{{ form.propertyType || '—' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Finalidade:</span>
                <span class="font-medium capitalize">{{ form.listingType || '—' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Localização:</span>
                <span class="font-medium">{{ form.neighborhood || '—' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Preço:</span>
                <span class="font-medium text-blue-700">
                  {{ form.price ? `${(form.price / 1000000).toFixed(0)}M AOA` : '—' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between">
        <Button variant="outline" @click="currentStep = currentStep > 1 ? currentStep - 1 : 1"
          :disabled="currentStep === 1" class="border-gray-200 flex items-center gap-2">
          <ChevronLeft :size="15" />
          Anterior
        </Button>

        <span class="text-sm text-gray-500">
          Passo {{ currentStep }} de {{ steps.length }}
        </span>

        <Button @click="handleNext"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2">
          {{ currentStep === 5 ? 'Publicar imóvel' : 'Continuar' }}
          <CheckCircle2 v-if="currentStep === 5" :size="15" />
          <ChevronRight v-else :size="15" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2, Upload, X, ChevronRight, ChevronLeft,
  Home, MapPin, DollarSign, Image, FileText, Check
} from 'lucide-vue-next'
import Navbar from '/components/NavBar.vue'
import { ANGOLA_CITIES, LUANDA_NEIGHBORHOODS } from '@/lib/mockData'

const router = useRouter()
const currentStep = ref(1)
const submitted = ref(false)

const form = reactive({
  propertyType: '',
  listingType: '',
  city: 'Luanda',
  neighborhood: '',
  address: '',
  price: '',
  priceUnit: 'total',
  bedrooms: '',
  bathrooms: '',
  area: '',
  garage: '',
  title: '',
  description: '',
  features: [],
  images: []
})

const steps = [
  { id: 1, label: 'Tipo', icon: Home, description: 'Tipo de imóvel' },
  { id: 2, label: 'Localização', icon: MapPin, description: 'Onde fica' },
  { id: 3, label: 'Preço', icon: DollarSign, description: 'Valor e condições' },
  { id: 4, label: 'Fotos', icon: Image, description: 'Imagens do imóvel' },
  { id: 5, label: 'Detalhes', icon: FileText, description: 'Descrição e características' }
]

const propertyTypes = [
  { value: 'apartamento', label: 'Apartamento', emoji: '🏢' },
  { value: 'casa', label: 'Casa / Moradia', emoji: '🏠' },
  { value: 'villa', label: 'Villa', emoji: '🏡' },
  { value: 'terreno', label: 'Terreno', emoji: '🌿' },
  { value: 'comercial', label: 'Comercial', emoji: '🏪' }
]

const listingTypes = [
  { value: 'venda', label: 'Venda', desc: 'Transferência de propriedade' },
  { value: 'arrendar', label: 'Arrendamento', desc: 'Aluguer mensal' }
]

const angolaCities = ANGOLA_CITIES
const luandaNeighborhoods = LUANDA_NEIGHBORHOODS

const featuresList = [
  'Piscina', 'Garagem', 'Jardim', 'Varanda', 'Terraço',
  'Segurança 24h', 'Ar condicionado', 'Cozinha equipada',
  'Vista mar', 'Vista cidade', 'Gerador', 'Fibra óptica',
  'Mobilado', 'Condomínio fechado', 'Ginásio', 'Elevador'
]

const canProceed = () => {
  switch (currentStep.value) {
    case 1: return form.propertyType && form.listingType
    case 2: return form.city && form.neighborhood
    case 3: return form.price
    case 4: return true // Images optional
    case 5: return form.title && form.description
    default: return false
  }
}

const handleNext = () => {
  if (!canProceed()) return
  if (currentStep.value < 5) {
    currentStep.value++
  } else {
    handleSubmit()
  }
}

const handleSubmit = () => {
  submitted.value = true
}

const resetForm = () => {
  submitted.value = false
  currentStep.value = 1
  Object.assign(form, {
    propertyType: '',
    listingType: '',
    city: 'Luanda',
    neighborhood: '',
    address: '',
    price: '',
    priceUnit: 'total',
    bedrooms: '',
    bathrooms: '',
    area: '',
    garage: '',
    title: '',
    description: '',
    features: [],
    images: []
  })
}

const toggleFeature = (feature) => {
  const index = form.features.indexOf(feature)
  if (index === -1) {
    form.features.push(feature)
  } else {
    form.features.splice(index, 1)
  }
}
</script>
