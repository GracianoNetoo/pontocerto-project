<template>
  <Dialog :open="internalOpen" @update:open="handleOpenChange">
    <DialogContent
      class="py-5 bg-[#f8f8f7] rounded-[20px] w-100 shadow-[0px_4px_11px_0px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.08)] backdrop-blur-2xl p-0 gap-0 text-center">
      <div class="flex flex-col items-center gap-2 p-5 pt-12">
        <div v-if="logo"
          class="w-16 h-16 bg-white rounded-xl border border-[rgba(0,0,0,0.08)] flex items-center justify-center">
          <img :src="logo" alt="Dialog graphic" class="w-10 h-10 rounded-md" />
        </div>

        <!-- Title and subtitle -->
        <DialogTitle v-if="title" class="text-xl font-semibold text-[#34322d] leading-6.5 tracking-[-0.44px]">
          {{ title }}
        </DialogTitle>
        <DialogDescription class="text-sm text-[#858481] leading-5 tracking-[-0.154px]">
          Please login with Manus to continue
        </DialogDescription>
      </div>

      <DialogFooter class="px-5 py-5">
        <!-- Login button -->
        <Button @click="onLogin"
          class="w-full h-10 bg-[#1a1a19] hover:bg-[#1a1a19]/90 text-white rounded-[10px] text-sm font-medium leading-5 tracking-[-0.154px]">
          Login with Google
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const props = defineProps({
  title: String,
  logo: String,
  open: {
    type: Boolean,
    default: false
  },
  onLogin: Function,
  onOpenChange: Function,
  onClose: Function
})

const internalOpen = ref(props.open)

watch(() => props.open, (newVal) => {
  if (!props.onOpenChange) {
    internalOpen.value = newVal
  }
})

const handleOpenChange = (nextOpen) => {
  if (props.onOpenChange) {
    props.onOpenChange(nextOpen)
  } else {
    internalOpen.value = nextOpen
  }

  if (!nextOpen) {
    props.onClose?.()
  }
}
</script>
