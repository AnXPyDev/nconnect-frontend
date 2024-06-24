<script setup lang="ts">
import { ref } from 'vue';
import { type Organizer, type Stage } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import Input from '@/components/util/input/Input.vue';
import ImageResourceSelector from '@/components/cms/gallery/ImageResourceSelector.vue';
import ContactEditor from '@/components/cms/contact/ContactEditor.vue';
import type { ConfirmationCallback } from '@/lib/cms/Editor';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const organizer = defineModel<Organizer>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (!organizer.value.name) {
        return "Name empty";
    }
    
    if (!organizer.value.role) {
        return "Role empty";
    }

    return true;
}


</script>

<template>
    <Editor @done="emit('done')" v-bind="{ validate, confirm, delete_ }">
        <template #title>
            <slot></slot>
        </template>
        <template #items>
            <Input v-model="organizer.name">Name</Input>
            <Input v-model="organizer.role">Role</Input>
            <ImageResourceSelector v-model="organizer.image_id">Image</ImageResourceSelector>
            <ContactEditor v-model="organizer.contact">Contact</ContactEditor>
        </template>
    </Editor>
</template>