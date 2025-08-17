<script setup lang="ts">
import { ref } from 'vue';
import { Select, SelectItem } from '@/src/components/custom-ui/select';

const items = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
];

const selectedValue = ref();
</script>

<template>
  <Select v-model="selectedValue" placeholder="something...">
    <template v-slot:trigger="value">
      
      <div v-if="value">{{ value }}</div>
        

    </template>

    <template #content>
      <template v-for="item in items" :key="item.id">
        <SelectItem :value="item.id">
          {{ item.name }}
        </SelectItem>
      </template>
    </template>
  </Select>
  <div>Selected Value: {{ selectedValue }}</div>
</template>