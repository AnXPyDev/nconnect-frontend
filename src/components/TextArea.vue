
<script setup lang="ts">

const model = defineModel<string>();

</script>

<template>

    <div class="textarea">
        <div class="label">
            <slot></slot>
        </div>
        <textarea v-model="model"></textarea>
    </div>

</template>

<style scoped lang="scss">

.textarea {
    --min-input-width: 40em;
    --min-input-height: 10em;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5em;

    > textarea {
        min-width: min(var(--min-input-width), 100%);
        min-height: var(--min-input-height);
    }

}

</style>