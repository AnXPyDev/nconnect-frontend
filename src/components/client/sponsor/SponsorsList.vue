<script setup lang="ts">

import type { Sponsor } from '@/lib/remote/Models';
import SponsorCard from './SponsorCard.vue';

const props = defineProps<{
    sponsors: Sponsor[]
}>();

</script>


<template>
    <div class="sponsors">
        <SponsorCard v-for="sponsor in sponsors" :sponsor="sponsor"></SponsorCard>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/media';
.sponsors {
    $gap: 2em;
    display: flex;
    flex-wrap: wrap;
    gap: $gap;
    
    --per-row: 4;
    @include media.phone {
        --per-row: 2;
    }

    > .sponsor-card {
        @include mixins.card-shadow;
        width: calc((100% - (var(--per-row) - 1) * $gap) / var(--per-row));
    }
}
</style>