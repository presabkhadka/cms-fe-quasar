<script setup lang="ts">
defineProps<{
  title: string;
  value: number;
}>();
</script>

<template>
  <q-card class="q-pa-md shadow-2 rounded-borders bg-grey-2">
    <slot>
      <div class="row items-center justify-between text-h6">
        <div>{{ title }}</div>
        <div>{{ value }}</div>
      </div>
    </slot>
  </q-card>
</template>
