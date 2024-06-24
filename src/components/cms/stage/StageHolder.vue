<script setup lang="ts">
import { ref } from 'vue';
import { AdminPriv, type Stage, type WithID } from '@/lib/remote/Models';
import TimeslotsManager from '@/components/cms/timeslot/TimeslotsManager.vue';
import TextButton from '../util/TextButton.vue';
import { useAuth } from '@/stores/auth';

const props = defineProps<{
    stage: WithID<Stage>
}>();

const emit = defineEmits<{
    edit: []
}>();

const showTimeslots = ref<boolean>(false);

const auth = useAuth();

</script>

<template>
    <div class="stage">
        <div class="header">
            <span class="id">[{{ stage.id }}]</span>
            <span class="name">{{ stage.name }}</span>

            <TextButton v-if="auth.checkPriv(AdminPriv.EDIT)" @click="emit('edit')" class="icon-button">
                <i class="fa-solid fa-pen"></i>
            </TextButton>

            <TextButton @click="showTimeslots = !showTimeslots" :active="showTimeslots" class="icon-button">
                <i class="fa-solid fa-clock"></i>
            </TextButton>

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