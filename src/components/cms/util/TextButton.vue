<template>

    <span class="text-button">
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