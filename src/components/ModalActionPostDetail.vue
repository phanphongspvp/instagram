<template>
    <div class="w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center" @click.self="emit('close')">
        <div class="max-w-[400px] w-full bg-white shadow-md rounded-md flex flex-col relative" @click.stop>
            <button @click="handleDelete" class="text-red-500 text-sm font-medium py-3.5">Delete</button>
            <button class="text-sm font-normal py-3.5 border-t">Edit</button>
            <button @click="emit('close')" class="text-sm font-normal py-3.5 border-t">Cancel</button>
            <Loading v-if="isLoading" title="Deleting post..." />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Loading from '@/components/Loading.vue';

const store = useStore();
const emit = defineEmits(["closeModel", "close"]);

const isLoading = ref(false);
const post = computed(() => store.state.post.post);

const handleDelete = async () => {
    isLoading.value = true;
    await store.dispatch("deletePost", post.value._id);
    isLoading.value = false;
    emit("close");
    emit("closeModel");
}
</script>