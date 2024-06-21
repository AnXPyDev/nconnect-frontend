<script setup lang="ts">

import CKEditor from '@ckeditor/ckeditor5-vue';
import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ref } from 'vue';

const content = defineModel<string>({ required: true });

const config = ref({
});

function onEditorReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

</script>

<template>
    <div class="root">
        <CKEditor.component class="editor" v-model="content" :editor="DocumentEditor" @ready="onEditorReady"></CKEditor.component>
    </div>
</template>

<style scoped lang="scss">

.root {
    background-color: var(--clr-bg);
    > .editor {
        width: 100%;
        min-height: 100%;
    }
}

</style>