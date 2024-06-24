<script setup lang="ts">

import Spinner from '@/components/util/Spinner.vue';
import { ref } from 'vue';

const loading = ref(true);


let CKEditor: typeof import('@ckeditor/ckeditor5-vue').default;
let DocumentEditor: typeof import('@ckeditor/ckeditor5-build-decoupled-document').default;

const content = defineModel<string>({ required: true });

const config = ref({
});

function onEditorReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

(async () => {
    CKEditor = (await import('@ckeditor/ckeditor5-vue')).default;
    DocumentEditor = (await import('@ckeditor/ckeditor5-build-decoupled-document')).default;
    loading.value = false;
})();

</script>

<template>
    <Spinner v-if="loading"></Spinner>
    <div v-else class="root">
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