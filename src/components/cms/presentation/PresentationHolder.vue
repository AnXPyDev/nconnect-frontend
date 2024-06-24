<script setup lang="ts">

import { AdminPriv, type Presentation, type WithID } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';
import { useAuth } from '@/stores/auth';
import { ref } from 'vue';
import TextButton from '../util/TextButton.vue';

const props = defineProps<{
    presentation: WithID<Presentation>
}>();

const emit = defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

const auth = useAuth();

</script>

<template>
    <div class="presentation">
        <div class="header">
            <span class="id">[{{ presentation.id }}]</span>
            <span class="name">{{ presentation.name }}</span>

            <TextButton class="icon-button" v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')">
                <i v-if="auth.checkPriv(AdminPriv.EDIT)" class="fa-solid fa-pen"></i>
            </TextButton>
            <TextButton v-if="presentation.image_id" @click="showImage = !showImage" class="icon-button" :active="showImage">
                <i class="fa-solid fa-image"></i>
            </TextButton>
        </div>

        <div class="details">
            <div class="image" v-if="showImage">
                <img :src="getResourceURL(presentation.image_id!!)"/>
            </div>
            <div v-if="presentation.description" class="description">{{ presentation.description }}</div>
            <div v-if="presentation.long_description" class="description">{{ presentation.long_description }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.presentation {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}
</style>