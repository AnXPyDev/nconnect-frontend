<script setup lang="ts">
import { type Presentation } from '@/lib/remote/Models';
import Editor from '@/components/cms/util/Editor.vue';
import Input from '@/components/util/input/Input.vue';
import InputNumber from '@/components/util/input/InputNumber.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import SpeakerSelector from '../speaker/SpeakerSelector.vue';
import ImageResourceSelector from '../gallery/ImageResourceSelector.vue';
import Toggle from '@/components/util/input/Toggle.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const presentation = defineModel<Presentation>({ required: true });


const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (presentation.value.name.length == 0) {
        return "Name empty";
    }

    return true;
}

</script>

<template>
    <Editor v-bind="{ confirm, validate, delete_ }" @done="emit('done')">
        <template v-slot:title>
            <slot></slot>
        </template>

        <template v-slot:items>
            <Input v-model="presentation.name">Name</Input>
            <InputNumber v-model="presentation.capacity">Capacity</InputNumber>
            <TextArea v-model="presentation.description">Short Description</TextArea>
            <TextArea v-model="presentation.long_description">Long Description</TextArea>
            <ImageResourceSelector allow-none v-model="presentation.image_id">Thumbnail</ImageResourceSelector>
            <SpeakerSelector v-model="presentation.speaker_id">Speaker</SpeakerSelector>
            <Toggle v-model="presentation.allow_registration">Allow Registration</Toggle>
        </template>
    </Editor>
</template>