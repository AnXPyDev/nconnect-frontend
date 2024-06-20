<script setup lang="ts">
import type { Headliner } from '@/lib/remote/Models';
import HeadlinerCard from './HeadlinerCard.vue';


const props = defineProps<{
    headliners: Headliner[]
}>();

</script>

<template>
    <div class="headliners">
        <HeadlinerCard v-for="headliner in headliners" :headliner="headliner"></HeadlinerCard>
    </div>
</template>

<style scoped lang="scss">

@use '@/styles/lib/mixins';
@use '@/styles/lib/dimens';
@use '@/styles/lib/media';

.headliners {
    $gap: 2em;
    display: flex;
    flex-wrap: wrap;
    gap: $gap;

    --per-row: 2;
    @include media.phone {
        --per-row: 1;
    }

    > .headliner-card {
        @include mixins.card-shadow;
        width: dimens.spread-percentage(var(--per-row), $gap);

    }
}
</style>