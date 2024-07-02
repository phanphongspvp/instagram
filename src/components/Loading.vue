<template>
    <div role="status" class="absolute bg-gray-100 w-full h-full flex flex-col items-center justify-center gap-4 z-999">
        <vue-icon class="animate-spin text-4xl" :icon="['fas', 'spinner']" />
        <h6 class="block">{{ title }}</h6>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(["title"]);
const title = props?.title;
</script>