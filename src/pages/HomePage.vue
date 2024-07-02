<template>
    <LayoutMain>
        <div class="max-w-[1014px] mx-auto mt-6">
            <div class="flex items-center gap-[64px]">
                <div class="w-full max-w-[630px]">
                    <div class="flex gap-[20px]">
                        <ItemStory image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg" name="Phan Phong" />
                        <ItemStory image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg" name="Test" />
                        <ItemStory image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg" name="Test 1" />
                        <ItemStory image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg" name="Test 2" />
                    </div>
                </div>
                <div class="w-full max-w-[319px] px-4">
                    <ItemProfileSmall
                        image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg"
                        name="phongg_2810"
                        fullName="Phan Phong"
                        :isProfile="true"
                    />
                </div>
            </div>
            <div class="flex gap-[64px]">
                <div class="w-full max-w-[630px] flex justify-end pt-6">
                    <div class="w-full max-w-[468px] relative">
                        <Loading v-if="loading" />
                        <div v-else v-for="post in posts">
                            <ItemPost :post="post" />
                        </div>
                    </div>
                </div>
                <div class="w-full max-w-[319px] px-4">
                    <div class="flex justify-between">
                        <span class="text-sm font-bold text-gray-500">Suggested for you</span>
                        <button class="text-xs font-bold">See All</button>
                    </div>
                    <div class="flex flex-col gap-4 py-4">
                        <ItemProfileSmall
                            image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg" 
                            name="phongg_2810"
                            fullName="Phan Phong"
                            :isProfile="false"
                        />
                        <ItemProfileSmall
                            image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg" 
                            name="phongg_2810"
                            fullName="Phan Phong"
                            :isProfile="false"
                        />
                        <ItemProfileSmall
                            image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg" 
                            name="phongg_2810"
                            fullName="Phan Phong"
                            :isProfile="false"
                        />
                        <ItemProfileSmall
                            image="https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg" 
                            name="phongg_2810"
                            fullName="Phan Phong"
                            :isProfile="false"
                        />
                    </div>
                </div>
            </div>
        </div>
    </LayoutMain>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";

import LayoutMain from '@/layouts/LayoutMain.vue';
import ItemStory from '@/components/ItemStory.vue';
import ItemProfileSmall from '@/components/ItemProfileSmall.vue';
import ItemPost from '@/components/ItemPost.vue';
import Loading from '@/components/Loading.vue';

const store = useStore();

const posts = computed(() => store.state.post.posts);
const loading = computed(() => store.state.post.loading);
const error = computed(() => store.state.post.error);

// onMounted(async () => {
//     await store.dispatch("getPosts");
// })
</script>