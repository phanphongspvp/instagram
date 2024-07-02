<template>
  <div class="flex justify-between">
    <div class="flex items-start gap-3">
      <img
        class="w-8 h-8 rounded-full border"
        :src="item.user.avatar"
        :alt="item.user.name"
      />
      <div class="flex flex-col gap-2 pr-4">
        <div class="break-all">
          <p class="text-xs">
            <span class="text-sm font-medium mr-1">{{
              item.user.username
            }}</span>
            {{ item.comment }}
          </p>
        </div>
        <div class="flex gap-2 items-center text-xs text-gray-500">
          <span>{{ item.createdAt }}</span>
          <button class="font-medium">Reply</button>
        </div>
      </div>
    </div>
    <vue-icon class="text-xs mt-4" :icon="['far', 'heart']" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["item"]);
const { item } = props;
</script>
