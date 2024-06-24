<script setup lang="ts">
import { ref } from 'vue';
import { type Speaker, type Sponsor, type Stage } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import Input from '@/components/util/input/Input.vue';
import ImageResourceSelector from '@/components/cms/gallery/ImageResourceSelector.vue';
import ContactEditor from '@/components/cms/contact/ContactEditor.vue';
import type { ConfirmationCallback } from '@/lib/cms/Editor';
import TextAreaNullable from '@/components/util/input/TextAreaNullable.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const sponsor = defineModel<Sponsor>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (sponsor.value.name.length == 0) {
        return "Name empty";
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
            <Input v-model="sponsor.name">Name</Input>
            <TextAreaNullable v-model="sponsor.description">Description</TextAreaNullable>
            <ImageResourceSelector allow-none v-model="sponsor.image_id">Image</ImageResourceSelector>
            <ContactEditor v-model="sponsor.contact">Contact</ContactEditor>
        </template>
    </Editor>
</template>