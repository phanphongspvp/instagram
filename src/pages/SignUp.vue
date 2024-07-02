<template>
    <LayoutSingle>
        <div class="max-w-[348px] w-full">
            <div class="flex flex-col items-center p-[40px] border gap-[40px]">
                <IcInstagram class="w-[175px] h-[51px]" />

                <form class="flex flex-col gap-4 w-full" @submit="handleSignUp">
                    <input v-model="name" class="text-xs p-2 border outline-none rounded-sm" type="text" placeholder="Full name">
                    <input v-model="username" class="text-xs p-2 border outline-none rounded-sm" type="text" placeholder="Phone number, username, or email">
                    <input v-model="password" class="text-xs p-2 border outline-none rounded-sm" type="password" placeholder="Password">
                    <button type="submit" class="bg-blue-400 text-white py-1.5 px-2 text-sm rounded-lg font-bold">Log in</button>
                    <div class="flex items-center justify-between gap-3 text-gray-500 text-[13px]">
                        <div class="border-t border-t-gray-300 w-full h-[1px]"></div>
                        OR
                        <div class="border-t border-t-gray-300 w-full h-[1px]"></div>
                    </div>
                    <button type="button" class="text-xs text-blue-900">Forgot password?</button>
                </form>
            </div>

            <div class="text-sm border mt-4 p-[25px] text-center">
                Do you already have an account? <router-link to="log-in" class="text-blue-400 font-bold">Sign Up</router-link>
            </div>
        </div>
    </LayoutSingle>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from "vuex";

import IcInstagram from '@/components/icons/IcInstagram.vue';
import LayoutSingle from '@/layouts/LayoutSingle.vue';
import { useRouter } from 'vue-router';

const name = ref("");
const username = ref("");
const password = ref("");
const store = useStore();
const router = useRouter();

const handleSignUp = async (e: Event) => {
    e.preventDefault();
    const data = {
        name: name.value,
        username: username.value,
        password: password.value
    }
    await store.dispatch("signup", data);

    const isAuthenticated = store.getters.isAuthenticated;

    if(isAuthenticated) {
        return router.push("/");
    }else {
        alert("Account or password is incorrect");
    }
}
</script>