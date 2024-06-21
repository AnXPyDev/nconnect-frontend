<script setup lang="ts">

import sanitizeHtml from 'sanitize-html';

const props = defineProps<{
    content?: string
}>();

</script>

<template>
    <div v-if="content" class="page-content" v-html="content"></div>
</template>