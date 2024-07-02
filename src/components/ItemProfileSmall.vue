<template>
    <div class="flex justify-between items-center">
        <div class="flex gap-[12px] items-center">
            <img
                class="w-12 h-12 rounded-full border-[2px] p-[1px] border-gray-200 object-cover"
                :src="image"
                :alt="name"
            />
            <div class="text-sm">
                <h5 class="font-bold">{{ name }}</h5>
                <p class="text-gray-500">{{ fullName }}</p>
            </div>
        </div>
        <button class="text-xs font-bold text-blue-500">
            {{ isProfile ? "Switch" : "Follow" }}
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(["image", "name", "fullName", "isProfile"]);
const { image, name, fullName, isProfile } = props;
</script>