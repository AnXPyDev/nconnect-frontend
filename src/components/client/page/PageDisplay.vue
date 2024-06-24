<script setup lang="ts">

import sanitizeHtml from 'sanitize-html';

const props = defineProps<{
    content?: string
}>();

// TODO
function sanitize(html: string) {
    return html;
}

</script>

<template>
    <div v-if="content" class="page-content ck-content" v-html="sanitize(content)"></div>
</template>

<style scoped lang="scss">
.page-content {
    width: 100%;
}
</style>