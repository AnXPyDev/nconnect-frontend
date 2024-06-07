<script setup lang="ts">
import { ref } from 'vue';
import { type Gallery } from '@/lib/Bridge';
import ImageResourceSelector from './ImageResourceSelector.vue';
import Editor from './Editor.vue';
import TextArea from '../TextArea.vue';
import Input from '../Input.vue';

const props = defineProps<{
    allowDelete?: boolean
}>();

const gallery = defineModel<Gallery>("gallery", { required: true });

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function validate() {
    if (gallery.value!!.name.length == 0) {
        return "No name";
    }

    return true;
}

</script>

<template>
    <Editor :allow-delete="allowDelete" :validate="validate" @done="emit('done')" @cancel="emit('cancel')" @delete="emit('delete')">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input v-model="gallery.name">Name</Input>
            <TextArea v-model="gallery.description">Description</TextArea>
            <ImageResourceSelector v-model="gallery.thumbnail_id"></ImageResourceSelector>
        </template>
    </Editor>
</template>