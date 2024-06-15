<script setup lang="ts">

const props = defineProps<{
    href?: string
}>();

</script>

<template>
    <a class="link" target="_blank" :href="href"><slot></slot></a>
</template>

<style scoped lang="scss">
.link {
    &[href]:hover {
        text-decoration: underline;
    }
}
</style>