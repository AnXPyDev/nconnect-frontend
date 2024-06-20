<script setup lang="ts">

const props = defineProps<{
    error?: string
}>();

</script>

<template>
    <div class="error" v-if="error"><i class="fa-solid fa-circle-exclamation"></i>&nbsp; {{ error }}</div>
</template>

<style setup lang="scss">
.error {
    font-size: 1.2em;
    color: var(--clr-error);
}
</style>