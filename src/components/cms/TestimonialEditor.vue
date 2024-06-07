<script setup lang="ts">
import type { Testimonial } from '@/lib/Bridge';
import { ref } from 'vue';
import Editor from './Editor.vue';
import Input from '../Input.vue';
import TextArea from '../TextArea.vue';
import ImageResourceSelector from './ImageResourceSelector.vue';


const props = defineProps<{
    allowDelete?: boolean
}>();

const testimonial = defineModel<Testimonial>("testimonial", { required: true });

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function validate() {
    if (testimonial.value.author.length == 0) {
        return "Empty author field";
    }

    if (testimonial.value.description.length == 0) {
        return "Empty description field";
    }

    return true;
}

</script>

<template>
    <Editor :validate="validate" :allow-delete="allowDelete" @done="emit('done')" @cancel="emit('cancel')" @delete="emit('delete')">
        <template v-slot:title>
            <slot></slot>
        </template>

        <template v-slot:items>
            <Input v-model="testimonial.author">Author</Input>
            <TextArea v-model="testimonial.description">Quote</TextArea>
            <ImageResourceSelector v-model="testimonial.image_id"></ImageResourceSelector>
        </template>
    </Editor>
</template>