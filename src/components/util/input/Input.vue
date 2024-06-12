<script setup lang="ts">

const model = defineModel<string>();

</script>

<template>

    <div class="input">
        <div class="label">
            <slot></slot>
        </div>
        <input v-model="model">
    </div>

</template>

<style scoped lang="scss">

.input {
    --min-input-width: 0;

    display: flex;
    align-items: center;
    gap: 0.5em;

    > input {
        min-width: var(--min-input-width);
    }

}

</style>