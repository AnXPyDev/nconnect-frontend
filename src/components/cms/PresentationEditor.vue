<script setup lang="ts">
import { ref } from 'vue';
import { type Presentation } from '@/lib/Bridge';
import Editor from './Editor.vue';
import Input from '../Input.vue';
import TextArea from '../TextArea.vue';

const props = defineProps<{
    allowDelete?: boolean
}>();

const presentation = defineModel<Presentation>("presentation", { required: true });


const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function validate() {
    if (presentation.value.name.length == 0) {
        return "Name empty";
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
            <Input v-model="presentation.name">Name</Input>
            <TextArea v-model="presentation.description">Short Description</TextArea>
            <TextArea v-model="presentation.long_description">Long Description</TextArea>
        </template>
    </Editor>
</template>