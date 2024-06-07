<script setup lang="ts">

import type { Stage } from '@/lib/Bridge';
import TimeslotsManager from './TimeslotsManager.vue';
import Section from './Section.vue';
import { ref } from 'vue';

const props = defineProps<{
    stage: Stage 
}>();

defineEmits<{
    edit: []
}>();

const showTimeslots = ref<boolean>(false);

</script>

<template>
    <div class="stage">
        <div class="header">
            <span class="id">[{{ stage.id }}]</span>
            <span class="name">{{ stage.name }}</span>

            <i @click="$emit('edit')" class="icon-button fa-solid fa-pen"></i>

            <i @click="showTimeslots = !showTimeslots" class="icon-button fa-solid fa-clock"></i>


        </div>

        <TimeslotsManager v-if="showTimeslots && stage.id" :stage_id="stage.id"></TimeslotsManager>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';

.stage {
    @include mixins.cmspanel;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5em;

    > .header {
        display: flex;
        gap: 0.5em;
        align-items: center;

        font-size: 1.2em;

        > .id {
            opacity: 75%;
            font-size: 0.75em;
        }

        > .icon-button {
            cursor: pointer;

            &:hover {
                color: var(--clr-primary);
            }
        }


    }
}

</style>