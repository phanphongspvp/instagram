<template>
    <div class="flex flex-col gap-3 py-5 last:border-none border-b border-b-gray-300">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
                <img
                    class="w-8 h-8 rounded-full border-[1px] border-gray-200 object-cover"
                    :src="post.image"
                    alt="Post Image"
                />
                <div class="flex flex-col items-start">
                    <button class="text-sm font-bold">
                        nguoi.doc.sach <span class="font-normal text-gray-500">• 2d</span>
                    </button>
                    <button class="text-xs">
                        {{ post.audio }}
                    </button>
                </div>
            </div>
            <button>
                <vue-icon icon="ellipsis" />
            </button>
        </div>
        <div class="w-full h-[585px] bg-black flex items-center justify-center rounded-[4px]">
            <img
                class="w-full"
                :src="post.image"
                alt="Post Image"
            />
        </div>
        <div class="flex justify-between">
            <div class="flex gap-4">
                <button @click="isHeart = !isHeart">
                    <vue-icon class="text-2xl" :class="{'text-red-500' : isHeart}" :icon="[isHeart ? 'fas' : 'far', 'heart']" />
                </button>
                <button>
                    <vue-icon class="text-2xl" :icon="['far', 'comment']" />
                </button>
                <button>
                    <vue-icon class="text-2xl" :icon="['far', 'paper-plane']" />
                </button>
            </div>
            <button @click="isFavorite = !isFavorite">
                <vue-icon class="text-2xl" :class="{'text-black' : isFavorite}" :icon="[isFavorite ? 'fas' : 'far', 'bookmark']" />
            </button>
        </div>
        <div class="flex flex-col gap-2 text-sm">
            <div>
                <button class="font-bold">{{ post.like }} likes</button>
            </div>
            <div>
                <button class="font-bold">phongg_2810</button> Please follow me...
            </div>
            <div>
                <button class="text-gray-500">View all {{ post.comment }} comments</button>
            </div>
            <div class="flex items-center justify-between">
                <input type="text" placeholder="Add a comment..." class="placeholder:text-gray-500 outline-none">
                <vue-icon :icon="['far', 'face-smile']" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps(["post"]);

const isHeart = ref(false);
const isFavorite = ref(false);
const { post } = props;
</script>