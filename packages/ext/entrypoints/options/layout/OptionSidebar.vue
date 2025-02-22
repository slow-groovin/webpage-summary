<!-- sidebar of option -->
<script setup lang="ts">
// sidebar of options.html page.
import { RouterLink, useRoute, useLink, useRouter } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();
const currentPath = computed(() => route.path);
const debugCharacters = import.meta.env.DEV ? [{ name: 'debug', path: '/debug' }] : [];
const groups = [
  {
    name: '',
    chapters: [
      { name: 'General', path: '/general' },
      { name: 'Page Extraction', path: '/page-extraction' },
      { name: 'Models', path: '/models' },
      { name: 'Prompts', path: '/prompts' },
      { name: 'Site Customization', path: '/site-customization' },
      { name: 'Appearance', path: '/appearance' },


    ]
  },
  {
    name: '',
    chapters: [
      // { name: 'about', path: '/models' },
      ...debugCharacters,
      // { name: 'Export/Import', path: '/p2' },
    ]
  }
]
</script>
<template>
  <div v-for="group in groups" class="flex flex-col gap-4">
    <div class="text-xl p-2 font-light">
      <h3>{{ group.name }}</h3>
    </div>


    <div class="flex flex-col gap-2">
      <div v-for="chapter in group.chapters">
        <RouterLink :to="chapter.path" class="flex items-center py-2 px-4 text-sm font-medium rounded-md"
          :class="{ 'text-green-500 bg-gray-200': currentPath.startsWith(chapter.path) }">
          <span class="mr-2"></span>
          <span class="ml-1">{{ chapter.name }}</span>
        </RouterLink>
      </div>
    </div>

  </div>
</template>
<style lang="postcss" scoped></style>