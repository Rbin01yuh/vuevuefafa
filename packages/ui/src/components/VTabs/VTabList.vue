<script setup lang="ts">
import { inject, type WritableComputedRef } from 'vue'

const activeValue = inject<WritableComputedRef<string | number | undefined>>('activeValue')
const handleKeydown = inject<(event: KeyboardEvent) => void>('handleKeydown')
</script>

<template>
  <div role="tablist" class="flex border-b border-neutral-200" @keydown="handleKeydown">
    <slot />
  </div>
</template>
