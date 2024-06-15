<script setup lang="ts">

import CKEditor from '@ckeditor/ckeditor5-vue';
import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ref } from 'vue';

const text = ref<string>("");

const config = ref({
});

function test() {
    console.log(text.value);
}

</script>

<template>
    <div class="content-container">
        <div class="content">
            <CKEditor.component v-model="text" :editor="DocumentEditor" ></CKEditor.component>
            <button @click="test">test</button>
        </div>
    </div>
</template>

<style>
</style>