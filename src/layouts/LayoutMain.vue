<template>
    <div class="w-full h-full flex">
        <Navbar />
        <div class="max-w-[calc(100%-242px)] flex-grow ml-auto">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
</script>

<style scoped>

</style>