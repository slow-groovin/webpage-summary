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
</script>

<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow-md p-4">
      <h1 class="text-2xl font-semibold">[NAME] Settings</h1>
    </header>
    <div class="flex flex-grow">
      <!-- Sidebar -->
      <nav class="border-r-2">
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
