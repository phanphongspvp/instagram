<!-- pages/EditAccount.vue -->

<template>
    <LayoutMain>
        <div class="flex">
            <div class="flex flex-col items-center min-w-[300px] h-screen gap-4 border-r pt-8">
                <button
                    class="flex items-center w-[220px] px-4 py-2 gap-3 rounded-md text-base"
                    :class="active === 'account' ? 'bg-gray-200' : ''"
                    @click="active = 'account'"
                >
                    <vue-icon :icon="['far', 'user']" />
                    Edit profile
                </button>
                <button
                    class="flex items-center w-[220px] px-4 py-2 gap-3 rounded-md text-base"
                    :class="active === 'notification' ? 'bg-gray-200' : ''"
                    @click="active = 'notification'"
                >
                    <vue-icon :icon="['far', 'bell']" />
                    Notifications
                </button>
            </div>
            <ItemEditUser v-if="active === 'account'" />
            <ItemEditNotification v-if="active === 'notification'" />
        </div>
    </LayoutMain>
</template>

<script setup lang="ts">
import { ref } from "vue";

import LayoutMain from '@/layouts/LayoutMain.vue';
import ItemEditUser from '@/components/EditAccount/ItemEditUser.vue';
import ItemEditNotification from '@/components/EditAccount/ItemEditNotification.vue';

const active = ref("account");

</script>