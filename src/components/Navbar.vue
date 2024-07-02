<template>
  <div class="w-[242px] h-screen border-r-gray-200 border-r pt-2 px-4 pb-5 flex flex-col justify-between fixed">
    <div>
      <router-link to="/" class="px-4 pt-6 pb-4 mb-5">
        <IcInstagram class="w-[103px] h-[29px] pl-4" />
      </router-link>
      <router-link to="/"
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('') ? 'font-bold' : ''">
        <vue-icon :icon="['fas', 'home']" class="text-2xl" />
        Home
      </router-link>
      <router-link to="/search"
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('search') ? 'font-bold' : ''">
        <vue-icon :icon="['fas', 'search']" class="text-2xl" />
        Search
      </router-link>
      <router-link to="/explore"
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('explore') ? 'font-bold' : ''">
        <vue-icon :icon="['far', 'compass']" class="text-2xl" />
        Explore
      </router-link>
      <router-link to="/reels"
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('reels') ? 'font-bold' : ''">
        <vue-icon :icon="['fas', 'film']" class="text-2xl" />
        Reels
      </router-link>
      <router-link to="/message"
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('message') ? 'font-bold' : ''">
        <vue-icon :icon="['far', 'message']" class="text-2xl" />
        Messages
      </router-link>
      <router-link to="/heart"
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('heart') ? 'font-bold' : ''">
        <vue-icon :icon="['far', 'heart']" class="text-2xl" />
        Notifications
      </router-link>
      <router-link to="/create"
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('create') ? 'font-bold' : ''">
        <vue-icon :icon="['fas', 'plus']" class="text-2xl" />
        Create
      </router-link>
      <router-link to="/profile"
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('profile') ? 'font-bold' : ''">
        <img class="w-6 h-6 rounded-full" :src="avatar" alt="avatar" />
        Profile
      </router-link>
    </div>
    <div class="relative">
      <!-- Popup More Start -->
      <div v-show="isModelMore" class="rounded-2xl absolute shadow-lg -top-32 left-0 w-[260px] flex flex-col bg-white p">
        <button class="text-sm p-4 flex items-center justify-center gap-3">
          <vue-icon class="text-xl" :icon="['fas', 'gear']" />
          Settings
        </button>
        <button @click="handleLogout" class="text-sm p-4 flex items-center justify-center gap-3 border-t-[2px] border-t-gray-200">
          Log out
        </button>
      </div>
      <!-- Popup More End -->
      <button
        class="p-3 flex items-center justify-start gap-4 w-full rounded-md transition-all hover:bg-gray-200"
        :class="isActive('more') ? 'font-bold' : ''" @click="isModelMore = !isModelMore">
        <vue-icon icon="bars" class="text-2xl" />
        More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

import { useRoute, useRouter } from "vue-router";
import IcInstagram from "./icons/IcInstagram.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const isModelMore = ref(false);
const avatar = computed(() => store.state.user.user.avatar);

const isActive = (name: string) => {
  if (route.fullPath.replace("/", "") == name) return true;
};

const handleLogout = () => {
  store.dispatch("logout");
  router.push("/");
}
</script>

<style scoped></style>
