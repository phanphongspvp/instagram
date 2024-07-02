<template>
    <div
        class="w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center" @click.self="emit('closeModel')">
        <vue-icon class="absolute top-1 right-2 text-2xl text-white cursor-pointer" :icon="['fas', 'xmark']"
            @click="emit('closeModel')" />
        <div class="max-w-[930px] w-full h-[500px] bg-white shadow-md rounded-md flex" @click.stop>
            <div class="flex-1 w-[50%] flex items-center justify-center bg-black relative">
                    <button @click="prevImage" class="absolute left-2" v-if="indexImage > 0">
                        <vue-icon class="text-white text-2xl" :icon="['fas', 'angle-left']" />
                    </button>
                    <img :src="post.imageUrls[indexImage]" :alt="post.title" class="transition-all select-none">
                    <button @click="nextImage" class="absolute right-2" v-if="indexImage !== post.imageUrls.length - 1">
                        <vue-icon class="text-white text-2xl" :icon="['fas', 'angle-right']" />
                    </button>
            </div>
            <div class="flex-1 w-[50%] relative">
                <div class="px-6 py-3 border-b flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <img class="w-8 h-8 rounded-full border" :src="avatar" :alt="username">
                        <h6 class="text-sm font-medium">{{ username }}</h6>
                    </div>
                    <vue-icon @click="isModelAction = true" class="cursor-pointer" :icon="['fas', 'ellipsis']" />
                </div>
                <div class="px-6 w-full max-h-[370px] pb-14 relative" :class="comments.length >= 4 && 'overflow-y-scroll'"
                    ref="commentContainer">
                    <!-- Post Main -->
                    <div class="flex gap-3 mt-4">
                        <img class="w-8 h-8 rounded-full border" :src="avatar" :alt="username">
                        <div>
                            <div class="break-all">
                                <p class="text-xs"><span class="text-sm font-medium mr-1">{{ username }}</span> {{ post.content }}</p>
                            </div>
                            <span class="text-xs text-gray-400">{{ post.createdAt }}</span>
                        </div>
                    </div>

                    <!-- Comment -->
                    <ItemComment class="mt-4" :item="item" v-for="item in comments" />
                </div>
                <div class="absolute bottom-0 right-0 left-0 bg-white z-999">
                    <div class="px-6 border-t py-3">
                        <div class="flex justify-between ">
                            <div class="flex gap-4">
                                <vue-icon @click="handleLike" :class="isHeart && 'text-red-500'"
                                    class="text-xl cursor-pointer" :icon="[isHeart ? 'fas' : 'far', 'heart']" />
                                <vue-icon @click="handleFocusComment" class="text-xl" :icon="['far', 'comment']" />
                                <vue-icon class="text-xl cursor-pointer" :icon="['far', 'paper-plane']" />
                            </div>
                            <div>
                                <vue-icon class="text-xl" :icon="['far', 'bookmark']" />
                            </div>
                        </div>
                        <p class="text-sm mt-1 font-medium" v-if="post.likes.length > 0">{{ post.likes.length }} like</p>
                        <button class="text-sm mt-1" v-if="post.likes.length === 0">Be the first to <span class="font-medium" @click="handleLike">like this</span></button>
                    </div>
                    <form class="flex items-center gap-3 px-6 border-t py-3" @submit="handlePostComment">
                        <vue-icon :icon="['far', 'face-smile']" />
                        <input ref="commentInput" type="text" v-model="comment" placeholder="Add a comment..."
                            class="text-sm outline-none flex-1">
                        <button :hidden="comment.trim() === ''" class="text-sm font-medium text-blue-600"
                            type="submit">Post</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <ModalActionPostDetail v-if="isModelAction" @close="isModelAction = false" @closeModel="emit('closeModel')" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import ModalActionPostDetail from "@/components/ModalActionPostDetail.vue";
import ItemComment from "@/components/ItemComment.vue";

const store = useStore();

const post = computed(() => store.state.post.post);

const userId = computed(() => store.state.user.user.id);
const username = computed(() => store.state.user.user.username);
const avatar = computed(() => store.state.user.user.avatar);

const comments = computed(() => store.state.comment.comments);

const isHeart = ref(false);
const comment = ref("");
const commentContainer = ref<HTMLElement | null>(null);
const commentInput = ref<HTMLElement | null>(null);
const isModelAction = ref(false);
const indexImage = ref(0);

onMounted(() => {
    store.dispatch("getComments", post.value._id);
    if (post.value.likes.includes(userId.value)) isHeart.value = true;
})

const emit = defineEmits(["closeModel", "close"]);

const handleLike = () => {
    isHeart.value = !isHeart.value;
    if (isHeart.value) {
        store.dispatch("likePost", {
            postId: post.value._id,
            userId: userId.value
        })
    } else {
        store.dispatch("unLikePost", {
            postId: post.value._id,
            userId: userId.value
        })
    }
}

const handlePostComment = async (e: Event) => {
    e.preventDefault();
    const data = {
        postId: post.value._id,
        userId: userId.value,
        comment: comment.value
    }
    await store.dispatch("createComment", data);
    commentContainer.value?.scrollTo({
        top: commentContainer.value.scrollHeight,
        behavior: "smooth"
    })
    comment.value = "";
}

const handleFocusComment = () => {
    commentInput.value?.focus();
}

const nextImage = () => {
    if(indexImage.value < post.value.imageUrls.length - 1) indexImage.value++;
}

const prevImage = () => {
    if(indexImage.value > 0) indexImage.value--;
}

</script>