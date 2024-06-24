<script setup lang="ts">

</script>

<template>

    <div class="input">
        <div class="label">
            <slot name="label"></slot>
        </div>
        <slot></slot>
    </div>

</template>

<style lang="scss">

.input {
    --min-input-width: 0;

    display: flex;
    align-items: center;
    gap: 0.5em;

    input, select {
        min-width: var(--min-input-width);
        max-width: 100%;
        width: fit-content;
    }

}

</style>