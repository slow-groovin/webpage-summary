<!-- sidebar of option -->
<script setup lang="ts">
// sidebar of options.html page.
import { RouterLink, useRoute, useLink, useRouter } from 'vue-router';
import { settingRoutes } from '../router';
import { computed } from 'vue';
const route = useRoute();
const currentPath = computed(() => route.path);
const groups = [
  {
    name: 'basic',
    chapters: [
      { name: 'basic', path: '/pages' },
      { name: 'prompt', path: '/prompts' },
      { name: 'models', path: '/models' },
      { name: 'site custom', path: '/p1' },

    ]
  },
  {
    name: 'other',
    chapters: [
      { name: 'export/import', path: '/models' },
      { name: 'debug', path: '/debug' },
      { name: 'about', path: '/models' },
    ]
  }
]
</script>
<template>
  <h2 class="text-2xl p-4 font-bold">Setting</h2>
  <div v-for="group in groups" class="flex flex-col gap-4">
    <div class="text-xl p-2 font-light">
      <h3>{{ group.name }}</h3>
    </div>


    <div class="flex flex-col gap-2">
      <div v-for="chapter in group.chapters">
        <RouterLink :to="chapter.path" class="flex items-center py-2 px-4 text-sm font-medium rounded-md bg-gray-100"
          :class="{ 'text-green-500 bg-gray-200': currentPath.startsWith(chapter.path) }">
          <span class="mr-2"></span>
          <span class="ml-1">{{ chapter.name }}</span>
        </RouterLink>
      </div>
    </div>

  </div>
</template>
<style lang="postcss" scoped></style>