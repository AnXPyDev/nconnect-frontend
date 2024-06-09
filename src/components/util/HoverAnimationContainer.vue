<template>
    <div class="hover-animation-container">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .hover-animation-container {
        --time: 0%;

        transition: --time 1s ease;

        &:hover {
            --time: 100%;
        }
    }
</style>

