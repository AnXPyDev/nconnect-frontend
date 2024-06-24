<script setup lang="ts">

import { ref } from 'vue';
import { type Page, type WithID } from '@/lib/remote/Models';
import AdminAuth from '@/components/admin/AdminAuth.vue';
import { useAuth } from '@/stores/auth';
import TextButton from '../util/TextButton.vue';

const props = defineProps<{
    page: WithID<Page>
}>();

const emit = defineEmits<{
    edit: [],
    editContent: [],
    show: [],
}>();

const showImage = ref<boolean>(false);

const auth = useAuth();

</script>

<template>

    <div class="page">
        <div class="header">
            <span class="id">[{{ page.id }}]</span>
            <span class="name">{{ page.name }}</span>
            <span class="slug">page/{{ page.metadata.slug }}</span>
            
            <template v-if="auth.checkPriv(AdminAuth.EDIT)">
                <TextButton class="icon-button" @click="emit('edit')">
                    <i class="fa-solid fa-pen"></i>
                </TextButton>
                <TextButton @click="emit('editContent')">
                    <i class="fa-solid fa-file-pen"></i>
                </TextButton>
            </template>
            <TextButton @click="emit('show')" class="icon-button">
                <i class="fa-solid fa-eye"></i>
            </TextButton>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.page {
    @include mixins.cmspanel;
    @include mixins.cmsitem;

    > .header {
        > .slug {
            font-style: italic;
        }
    }
}

</style>
