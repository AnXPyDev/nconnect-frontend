<script setup lang="ts">

const props = defineProps<{
    href: string
}>();

</script>

<template>
    <a class="link" :href="href"><slot></slot></a>
</template>

<style scoped lang="scss">
.link {
    &:hover {
        text-decoration: underline;
    }
}
</style>