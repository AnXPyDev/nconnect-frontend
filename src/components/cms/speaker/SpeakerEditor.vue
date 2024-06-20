<script setup lang="ts">
import { ref, watch } from 'vue';
import { type Speaker, type Stage } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import Input from '@/components/util/input/Input.vue';
import ImageResourceSelector from '@/components/cms/gallery/ImageResourceSelector.vue';
import ContactEditor from '@/components/cms/contact/ContactEditor.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const speaker = defineModel<Speaker>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (speaker.value!!.name.length == 0) {
        return "Name empty";
    }

    return true;
}

const company = ref({
    name: speaker.value.company?.name ?? "",
    link: speaker.value.company?.link ?? ""
});

watch(company, (value) => {
    if (value.name) {
        speaker.value.company = company.value;
    } else {
        speaker.value.company = undefined;
    }
}, { deep: true });

</script>

<template>
    <Editor @done="emit('done')" v-bind="{ validate, confirm, delete_ }">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input v-model="speaker.name">Name</Input>
            <Input v-model="speaker.subtitle">Subtitle</Input>
            <TextArea v-model="speaker.description">Description</TextArea>
            <ImageResourceSelector v-model="speaker.image_id">Image</ImageResourceSelector>
            <Input v-model="company.name">Company Name</Input>
            <Input v-model="company.link">Company Link</Input>
            <ContactEditor v-model="speaker.contact">Contact</ContactEditor>
        </template>
    </Editor>
</template>