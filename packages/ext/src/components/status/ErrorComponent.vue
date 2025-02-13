<template>
  <div class="error-component">
    <p>Error: {{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import {  } from 'vue';

defineProps({
  message: {
    type: String,
    required: false,
    default:'Some error happened.'
  },
});
</script>

<style scoped>
.error-component {
  color: red;
  padding: 10px;
  border: 1px solid red;
  margin-bottom: 10px;
}
</style>
