<template>
  <div v-if="hasError" class="flex items-center justify-center min-h-screen p-8 bg-background">
    <div class="flex flex-col items-center w-full max-w-2xl p-8">
      <AlertTriangle
        :size="48"
        class="text-destructive mb-6 shrink-0"
      />

      <h2 class="text-xl mb-4">An unexpected error occurred.</h2>

      <div class="p-4 w-full rounded bg-muted overflow-auto mb-6">
        <pre class="text-sm text-muted-foreground whitespace-break-spaces">
          {{ error?.stack }}
        </pre>
      </div>

      <button
        @click="reloadPage"
        :class="cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg',
          'bg-primary text-primary-foreground',
          'hover:opacity-90 cursor-pointer'
        )"
      >
        <RotateCcw :size="16" />
        Reload Page
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { AlertTriangle, RotateCcw } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const hasError = ref(false)
const error = ref(null)

onErrorCaptured((err) => {
  hasError.value = true
  error.value = err
  return false // Prevent error from propagating further
})

const reloadPage = () => {
  window.location.reload()
}
</script>
