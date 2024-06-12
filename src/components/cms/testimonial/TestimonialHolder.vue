<script setup lang="ts">

import { type Testimonial } from '@/lib/remote/Models';
import { getResourceURL } from '@/lib/remote/Util';
import { ref } from 'vue';

const props = defineProps<{
    testimonial: Testimonial
}>();

const emit = defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

</script>

<template>
    <div class="testimonial">
        <div class="header">
            <span class="id">[{{ testimonial.id }}]</span>
            <span class="author">{{ testimonial.author }}</span>

            <i @click="emit('edit')" class="icon-button fa-solid fa-pen"></i>
            <i v-if="testimonial.image_id" @click="showImage = !showImage" class="icon-button fa-solid fa-image"></i>
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

