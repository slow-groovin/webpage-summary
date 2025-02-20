<script setup lang="ts">
import { isVNode } from 'vue'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.'
import { useToast } from './use-toast'
import icon from '~/assets/16.png'
const { toasts } = useToast()
</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <div class="grid gap-1">
        <!--NOTICE: here add ext icon, and not moved to custom-ui/ -->
        <ToastTitle v-if="toast.title" class="flex items-center gap-2">
          <img :src="icon" class="size-6"/>
          {{ toast.title }}
        </ToastTitle>
        <template v-if="toast.description">
          <ToastDescription v-if="isVNode(toast.description)">
            <img :src="icon" class="size-4 inline-block" v-if="!toast.title" />
            <component :is="toast.description" />
          </ToastDescription>
          <ToastDescription v-else>
            <img :src="icon" class="size-4 inline-block" v-if="!toast.title" />
            {{ toast.description }}
          </ToastDescription>
        </template>
        <ToastClose />
      </div>
      <component :is="toast.action" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
