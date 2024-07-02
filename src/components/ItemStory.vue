<template>
    <div class="text-center">
        <img
          class="w-16 h-16 rounded-full border-[2px] p-[2px] border-[#dc00b3] object-cover"
          :src="image"
          :alt="name"
        />
        <span class="text-xs">{{ name }}</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(["image", "name"]);
const { image, name } = props;
</script>

<style scoped>

</style>