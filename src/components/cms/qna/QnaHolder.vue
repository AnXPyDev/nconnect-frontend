<script setup lang="ts">

import { ref } from 'vue';
import { type Qna } from '@/lib/remote/Models';

const props = defineProps<{
    qna: Qna
}>();

defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

</script>

<template>

    <div class="qna">
        <div class="header">
            <span class="id">[{{ qna.id }}]</span>
            <span class="question">{{ qna.question }}</span>
            
            <i @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>
        </div>

        <div class="details">
            <div class="answer">
                {{ qna.answer }}
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.qna {
    @include mixins.cmspanel;
    @include mixins.cmsitem;
}

</style>
