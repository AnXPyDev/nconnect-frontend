<script setup lang="ts">

import { ref } from 'vue';
import { AdminPriv, type Qna, type WithID } from '@/lib/remote/Models';
import { useAuth } from '@/stores/auth';
import TextButton from '../util/TextButton.vue';

const props = defineProps<{
    qna: WithID<Qna>
}>();

const emit = defineEmits<{
    edit: []
}>();

const showImage = ref<boolean>(false);

const auth = useAuth();

</script>

<template>

    <div class="qna">
        <div class="header">
            <span class="id">[{{ qna.id }}]</span>
            <span class="question">{{ qna.question }}</span>
            <TextButton class="icon-button" v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')">
                <i class="fa-solid fa-pen"></i>
            </TextButton>
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
