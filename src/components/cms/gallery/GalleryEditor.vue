<script setup lang="ts">
import { type Gallery } from '@/lib/remote/Models';
import ImageResourceSelector from './ImageResourceSelector.vue';
import Editor from '@/components/cms/util/Editor.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import Input from '@/components/util/input/Input.vue';
import Toggle from '@/components/util/input/Toggle.vue';
import type { ConfirmationCallback } from '@/lib/cms/Editor';
import TextAreaNullable from '@/components/util/input/TextAreaNullable.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const gallery = defineModel<Gallery>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (gallery.value!!.name.length == 0) {
        return "No name";
    }

    return true;
}

</script>

<template>
    <Editor v-bind="{ validate, confirm, delete_ }" @done="emit('done')">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input v-model="gallery.name">Name</Input>
            <Toggle v-model="gallery.public">Public</Toggle>
            <TextAreaNullable v-model="gallery.description">Description</TextAreaNullable>
            <ImageResourceSelector v-model="gallery.thumbnail_id" allow-none>Thumbnail</ImageResourceSelector>
        </template>
    </Editor>
</template>