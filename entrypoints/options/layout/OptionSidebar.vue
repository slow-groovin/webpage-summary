<!-- sidebar of option -->
<script setup lang="ts">
// sidebar of options.html page.
import { t } from '@/src/utils/extension';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();
const currentPath = computed(() => route.path);
const debugCharacters = import.meta.env.DEV ? [{ name: 'debug', path: '/debug' }] : [];
const mainChapters = [
  { name: t('General'), path: '/general' },
  { name: t('Page_Extraction'), path: '/page-extraction' },
  { name: t('Models'), path: '/models' },
  { name: t('Prompts'), path: '/prompts' },
  { name: t('Site_Customization'), path: '/site-customization' },
  { name: t('Appearance'), path: '/appearance' },
]
const secondChapters = [
  ...debugCharacters,
  { name: t('Export_Import'), path: '/export_import' },
]
</script>
<template>
  <div>
    <div>
      <template v-for="chapter in mainChapters">
        <RouterLink :to="chapter.path" class="flex items-center py-2 px-4 text-sm font-medium rounded-md"
          :class="{ 'text-green-500 bg-gray-200': currentPath.startsWith(chapter.path) }">
          <span class="mr-2"></span>
          <span class="ml-1">{{ chapter.name }}</span>
        </RouterLink>
      </template>
    </div>

    <div class="border-b  my-4 mx-4"></div>

    <div class="text-sm  font-extralight text-gray-500 flex flex-col px-4 gap-2 ">
      <template v-for="chapter in secondChapters">
        <RouterLink :to="chapter.path" class="flex items-centerrounded-md"
          :class="{ 'text-green-500 bg-gray-200': currentPath.startsWith(chapter.path) }">
          <span class="">{{ chapter.name }}</span>
        </RouterLink>
      </template>
      <a href="https://github.com/slow-groovin/webpage-summary" target="_blank" class="">About</a>
    </div>

  </div>

</template>
<style lang="postcss" scoped></style>