<script setup lang="ts">

const props = defineProps<{
    active?: boolean
}>();

</script>

<template>

    <span class="text-button" :class="{ active }">
        <slot></slot>
    </span>

</template>

<style scoped lang="scss">

.text-button {
    cursor: pointer;

    &:hover, &.active {
        color: var(--clr-primary);
    }
}

</style>