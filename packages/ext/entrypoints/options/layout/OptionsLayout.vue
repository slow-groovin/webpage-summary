<!-- layout of options.html -->
<script lang="ts" setup>
import { ref } from 'vue';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader
} from '@/src/components/ui/sidebar';
import { RouterView } from 'vue-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Separator } from '@/src/components/ui/separator';
import OptionsSidebar from './OptionSidebar.vue'
import { useExtInfo } from '@/src/composables/extension';
const {name,version,iconUrl}=useExtInfo()
</script>

<template>
  <div class="flex flex-col">
    <header class="shadow-md px-4 py-2 flex flex-row items-center gap-1">
      <img :src="iconUrl" class="w-6 h-6"/>
      <h1 class="font-semibold">{{ name }} <span class="text-xs font-light"> {{ version }}</span></h1>
    </header>
    <div class="flex flex-grow">
      <!-- Sidebar -->
      <nav class="border-r-2 pt-4">
        <OptionsSidebar/>
      </nav>

      <!-- Main Content -->
      <main class="flex-1 p-4 max-w-5xl ml-8">
        
        <RouterView/>
        <div class=" h-[100vh] w-3"></div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
