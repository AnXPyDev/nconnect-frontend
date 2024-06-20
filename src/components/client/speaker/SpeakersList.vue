<script setup lang="ts">

import type { Speaker } from '@/lib/remote/Models';
import SpeakerCard from './SpeakerCard.vue';

const props = defineProps<{
    speakers: Speaker[]
}>();

</script>


<template>
    <div class="speakers">
        <SpeakerCard v-for="speaker in speakers" :speaker="speaker"></SpeakerCard>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';
@use '@/styles/lib/dimens';

.speakers {
    $gap: 2em;
    display: flex;
    flex-wrap: wrap;
    gap: $gap;
    
    --per-row: 4;
    @include media.phone {
        --per-row: 2;
    }

    > .speaker-card {
        @include mixins.card-shadow;
        width: dimens.spread-percentage(var(--per-row), $gap);
    }
}
</style>