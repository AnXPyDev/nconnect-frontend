<script setup lang="ts">

import type { Sponsor } from '@/lib/remote/Models';
import OrganizerCard from './OrganizerCard.vue';
import { type Organizer } from '@/lib/remote/Models';

const props = defineProps<{
    organizers: Organizer[]
}>();

</script>


<template>
    <div class="organizers">
        <OrganizerCard v-for="organizer in organizers" :organizer="organizer"></OrganizerCard>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';
.organizers {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: inherit;

    > .organizer-card {
        width: 100%;
    }
}
</style>