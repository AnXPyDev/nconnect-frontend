<script setup lang="ts">
import { type Page } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import Input from '@/components/util/input/Input.vue';
import Toggle from '@/components/util/input/Toggle.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const page = defineModel<Page>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (!page.value.name) {
        return "Question empty";
    }
    
    if (!page.value.metadata.slug) {
        return "Answer empty";
    }

    return true;
}


</script>

<template>
    <Editor @done="emit('done')" v-bind="{ validate, confirm, delete_ }">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input v-model="page.name">Name</Input>
            <Input v-model="page.metadata.slug">Slug</Input>
            <Toggle v-model="page.metadata.showHeader">Show Header</Toggle>
        </template>
    </Editor>
</template>