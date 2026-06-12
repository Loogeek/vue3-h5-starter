<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex items-center gap-1.5 mt-5 mb-2.5">
    <div class="w-[3px] h-4 rounded-full bg-[#42b883]" />
    <i-icon :icon="icon" class="text-base text-[#42b883]" />
    <h3 class="text-[15px] font-bold">
      {{ title }}
    </h3>
  </div>
</template>
