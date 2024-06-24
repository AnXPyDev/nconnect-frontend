<script setup lang="ts">

import { AdminPriv, type Testimonial, type WithID } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';
import { ref } from 'vue';
import TextButton from '../util/TextButton.vue';
import { useAuth } from '@/stores/auth';

const props = defineProps<{
    testimonial: WithID<Testimonial>
}>();

const emit = defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

const auth = useAuth();

</script>

<template>
    <div class="testimonial">
        <div class="header">
            <span class="id">[{{ testimonial.id }}]</span>
            <span class="author">{{ testimonial.author }}</span>

            <TextButton v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')" class="icon-button">
                <i class="fa-solid fa-pen"></i>
            </TextButton>

            <TextButton class="icon-button" v-if="testimonial.image_id" @click="showImage = !showImage" :active="showImage">
                <i class="fa-solid fa-image"></i>
            </TextButton>
        </div>
        <div class="details">
            <div v-if="showImage && testimonial.image_id"class="image">
                <img :src="getResourceURL(testimonial.image_id)"/>
            </div>
            <div class="description">
                {{ testimonial.description }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.testimonial {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}
</style>

