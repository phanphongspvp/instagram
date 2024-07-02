<template>
    <LayoutMain>
        <div class="w-full h-screen text-center relative">
            <Loading v-if="loading" title="Loading post..." />
            <div class="p-6" v-else>
                <h1 class="text-2xl mb-10">Create new post</h1>
                <form class="flex gap-10" @submit="handleShare">
                    <div class="w-[400px] h-[400px] rounded-md border flex flex-col gap-6 items-center justify-center">
                        <vue-icon class="text-5xl" :icon="['far', 'image']" />
                        <p>Drag photos and videos here</p>
                        <label for="image" class="text-white bg-blue-600 px-2 py-1 rounded-md cursor-pointer"
                            type="button">Select from computer</label>
                        <input type="file" hidden="true" id="image" @change="handleFileUpload">
                    </div>
                    <div class="flex-1 border rounded-md p-6 text-start">
                        <div class="flex items-center justify-between">
                            <div class="flex gap-2 items-center">
                                <img class="w-8 h-8 rounded-full border" :src="avatar" :alt="username">
                                <h6 class="text-sm font-semibold">{{ username }}</h6>
                            </div>
                            <button
                                type="submit"
                                class="text-sm font-semibold text-blue-500 px-2 py-1 border rounded-md">Share</button>
                        </div>
                        <textarea class="w-full outline-none mt-8" placeholder="Write a caption..." v-model="content"
                            cols="30" rows="11"></textarea>
                        <div v-if="errorMessage">
                            <p class="text-red-500 text-sm">{{errorMessage}}</p>
                        </div>
                    </div>
                </form>
                <div class="flex gap-4 mt-6">
                    <div class="relative" v-for="(img, index) in images" :key="index">
                        <vue-icon @click="handleCloseImage(index)"
                            class="absolute top-0 right-0 border bg-gray-200 p-[1px] rounded-full w-4 h-4 cursor-pointer"
                            :icon="['fas', 'xmark']" />
                        <img :src="img" alt="New Image Post" class="w-32 h-32 object-cover rounded-md border">
                    </div>
                </div>
            </div>
        </div>
    </LayoutMain>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { initializeApp } from 'firebase/app';
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from 'firebase/storage';

// Initialize Firebase (make sure you replace the config with your own)
const firebaseConfig = {
    apiKey: "AIzaSyArBDTJDOgx40S_abskkdREx9ADjUwrT9Q",
    authDomain: "instagram-clone-d3b8e.firebaseapp.com",
    projectId: "instagram-clone-d3b8e",
    storageBucket: "instagram-clone-d3b8e.appspot.com",
    messagingSenderId: "697229175300",
    appId: "1:697229175300:web:4fb62562b6008e355ca351"
};

initializeApp(firebaseConfig);

const firebaseStorage = getStorage();

import LayoutMain from '@/layouts/LayoutMain.vue';
import { useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';

const store = useStore();
const router = useRouter();

const userId = computed(() => store.state.user.user.userId);
const username = computed(() => store.state.user.user.username);
const avatar = computed(() => store.state.user.user.avatar);

const images = ref<string[]>([]);
const fileImages = ref<File[]>([]);
const fileUrls = ref<string[]>([]);
const content = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleFileUpload = (e: Event) => {
    const input = e.target as HTMLInputElement;
    errorMessage.value = "";
    if (input.files && input.files[0]) {
        const file = input.files[0];
        images.value.push(URL.createObjectURL(file));
        fileImages.value.push(file);
    }
};

const handleCloseImage = (index: number) => {
    images.value.splice(index, 1);
    fileImages.value.splice(index, 1);
}

const handleShare = async (e: Event) => {
    e.preventDefault();
    if(images.value.length === 0) {
        errorMessage.value = "You must upload at least 1 photo or video";
        return;
    }
    if(content.value.trim() === "") {
        errorMessage.value = "Caption cannot be blank";
        return;
    }
    loading.value = true;
    for (let i = 0; i < fileImages.value.length; i++) {
        const file = fileImages.value[i];
        const storageRef = refStorage(firebaseStorage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        fileUrls.value.push(url);
    }
    const data = {
        userId: userId.value,
        content: content.value,
        images: fileUrls.value
    }
    try {
        await store.dispatch("createPost", data);
    } finally {
        loading.value = false;
    }
    return router.push("/profile");
}


</script>