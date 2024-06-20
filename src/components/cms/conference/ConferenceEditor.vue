<script setup lang="ts">
import { type Conference } from '@/lib/remote/Models';

import Editor from '@/components/cms/util/Editor.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import Input from '@/components/util/input/Input.vue';
import ContactEditor from '@/components/cms/contact/ContactEditor.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const conference = defineModel<Conference>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    return true;
}


</script>

<template>
    <Editor @done="emit('done')" v-bind="{ validate, confirm, delete_ }">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <div class="select">
                <div class="label">State</div>
                <select v-model.number="conference.state">
                    <option value="0">Preparing</option>
                    <option value="1">Ongoing</option>
                </select>
            </div>
            <Input v-model="conference.date">Date</Input>
            <Input v-model="conference.subtitle">Subtitle</Input>
            <span>About Section</span>
            <Input v-model="conference.about_title">Title</Input>
            <TextArea v-model="conference.about_text">Text</TextArea>
            <span>Presentation</span>
            <Input v-model="conference.presentation_title">Title</Input>
            <Input v-model="conference.presentation_subtitle">Subtitle</Input>
            <span>Location</span>
            <Input v-model="conference.location_city">City</Input>
            <Input v-model="conference.location_name">Name</Input>
            <Input v-model="conference.location_full">Full</Input>
            <Input v-model="conference.location_link">Link</Input>
            <TextArea v-model="conference.location_map_embed">Map Embed URL</TextArea>
            <ContactEditor v-model="conference.contact">Contact</ContactEditor>
        </template>
    </Editor>
</template>

<style scoped lang="scss">

.select {
    display: flex;
    gap: 0.5em;
    align-items: center;
}

</style>