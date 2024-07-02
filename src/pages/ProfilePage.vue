<template>
    <LayoutMain>
        <div class="max-w-[935px] mx-auto mt-8">
            <div class="flex gap-[90px]">
                <img
                    class="w-[150px] h-[150px] rounded-full border-[2px] p-[2px] border-gray-200 object-cover"
                    :src="avatar"
                    :alt="name"
                />
                <div class="flex flex-col gap-[20px]">
                    <div class="flex gap-[12px]">
                        <button class="text-xl">{{ username }}</button>
                        <button class="text-sm font-bold bg-gray-200 rounded-md px-4 py-1">Edit profile</button>
                        <button class="text-sm font-bold bg-gray-200 rounded-md px-4 py-1">View archive</button>
                        <button>
                            <vue-icon class="text-xl" :icon="['fas', 'gear']" />
                        </button>
                    </div>
                    <div class="flex gap-[30px] text-base">
                        <p><span class="font-bold">{{ posts.length > 0 ? posts.length : 0 }}</span> posts</p>
                        <button><span class="font-bold">1M</span> followers</button>
                        <button><span class="font-bold">1M</span> following</button>
                    </div>
                    <div>
                        <span class="font-bold text-sm">{{ name }}</span>
                    </div>
                </div>
            </div>
            <div class="py-[50px] border-b border-b-gray-200">
                <button class="text-xs font-bold">
                    <div class="bg-gray-50 rounded-full border-gray-200 w-[85px] h-[85px] flex items-center justify-center border text-[44px] mb-3 font-light">
                        +
                    </div>
                    New
                </button>
            </div>
            <div class="flex flex-col items-center">
                <div class="flex gap-[60px] font-medium text-xs">
                    <button
                        class="flex items-center py-4 gap-2"
                        @click="category = 'POSTS'"
                        :class="{
                            'border-t border-t-gray-500' : category === 'POSTS',
                            'text-gray-500' : category !== 'POSTS'
                        }"
                    >
                        <vue-icon :icon="['fas', 'border-all']" />
                        POSTS
                    </button>
                    <button
                        class="flex items-center py-4 gap-2"
                        @click="category = 'SAVED'"
                        :class="{
                            'border-t border-t-gray-500' : category === 'SAVED',
                            'text-gray-500' : category !== 'SAVED'
                        }"
                    >
                        <vue-icon :icon="['far', 'bookmark']" />
                        SAVED
                    </button>
                    <button
                        class="flex items-center py-4 gap-2"
                        @click="category = 'TAGGED'"
                        :class="{
                            'border-t border-t-gray-500' : category === 'TAGGED',
                            'text-gray-500' : category !== 'TAGGED'
                        }"
                    >
                        <vue-icon :icon="['far', 'id-card']" />
                        TAGGED
                    </button>
                </div>
                <div v-if="category === 'POSTS'" class="flex flex-col items-center gap-5 w-full my-[60px]">
                    <div v-if="!posts">
                        <span class="w-[62px] h-[62px] flex items-center justify-center border-[2px] border-black rounded-full">
                            <vue-icon class="text-3xl" :icon="['fas', 'camera']" />
                        </span>
                        <h3 class="font-bold text-3xl">Share Photos</h3>
                        <p class="text-sm">When you share photos, they will appear on your profile.</p>
                        <router-link to="/create" class="text-blue-500 text-sm font-medium hover:text-blue-800">Share your first photo</router-link>
                    </div>
                    <div v-if="posts" class="grid grid-cols-3 gap-2">
                        <div
                            v-for="post in posts"
                            class="w-full max-h-[300px] rounded-sm overflow-hidden cursor-pointer relative"
                            @mouseover="hoveredPostId = post._id"
                            @mouseleave="hoveredPostId = ''"
                            @click="handleModal(post._id)"
                        >
                            <img class="w-full h-full object-cover hover:":src="post.imageUrls[0]" alt="New">
                            <div v-if="hoveredPostId === post._id" class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-sm transition-opacity bg-black bg-opacity-40">
                                {{ post.content }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="category === 'SAVED'" class="flex flex-col items-center gap-5 w-full my-[60px]">
                    <h3 class="font-bold text-3xl">No Saved</h3>
                </div>
                <div v-if="category === 'TAGGED'" class="flex flex-col items-center gap-5 w-full my-[60px]">
                    <h3 class="font-bold text-3xl">No Tagged</h3>
                </div>
            </div>
        </div>
        <ModalPostDetail v-if="isModel" @closeModel="isModel = false" />
    </LayoutMain>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

import LayoutMain from '@/layouts/LayoutMain.vue';
import ModalPostDetail from "@/components/ModalPostDetail.vue";

const category = ref("POSTS");
const store = useStore();
const hoveredPostId = ref("");
const isModel = ref(false);

const userId = computed(() => store.state.user.user.userId);
const name = computed(() => store.state.user.user.name);
const username = computed(() => store.state.user.user.username);
const avatar = computed(() => store.state.user.user.avatar);

const posts = computed(() => store.state.post.posts);

onMounted(async () => {
    await store.dispatch("getPostsByUserId", userId.value);
})

watch(isModel, (newValue) => {
    if(newValue) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
})

const handleModal = async (id: string) => {
    await store.dispatch("getPostById", id);
    isModel.value = true;
}

</script>