<!-- layout of options.html -->
<script lang="ts" setup>
import { useExtInfo } from '@/src/composables/extension';
import { RouterView, useRoute, useRouter } from 'vue-router';
import OptionsSidebar from './OptionSidebar.vue';
import { computed } from 'vue';
import { MoveLeftIcon } from 'lucide-vue-next';
import Button from '@/src/components/ui/button/Button.vue';
const { name, version, iconUrl } = useExtInfo()
const { back } = useRouter()
const route = useRoute()
const canBack = computed(() => {
  return route.path.split('/').length > 2
})
</script>

<template>
  <div class="flex flex-col">
    <header class="shadow-md px-4 py-2 flex flex-row items-center gap-1">
      <img :src="iconUrl" class="w-6 h-6" />
      <h1 class="font-semibold">{{ name }} <span class="text-xs font-light"> {{ version }}</span></h1>
    </header>
    <div class="flex flex-grow">
      <!-- Sidebar -->
      <nav class="border-r-2 pt-4">
        <OptionsSidebar />
      </nav>

      <!-- Main Content -->
      <main class="relative flex-1 p-4 max-w-5xl ml-8">
        <Button v-if="canBack" variant="outline"  class="" @click="back">
          <MoveLeftIcon />
        </Button>

        <RouterView />
        <div class=" h-[100vh] w-3"></div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
