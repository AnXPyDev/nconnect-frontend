<script setup lang="ts">
import type { Testimonial } from '@/lib/remote/Models';
import Editor from '@/components/cms/util/Editor.vue';
import Input from '@/components/util/input/Input.vue';
import TextArea from '@/components/util/input/TextArea.vue';
import ImageResourceSelector from '@/components/cms/gallery/ImageResourceSelector.vue';


const props = defineProps<{
    confirm: ConfirmationCallback,
    delete_?: ConfirmationCallback
}>();

const testimonial = defineModel<Testimonial>({ required: true });

const emit = defineEmits<{
    done: []
}>();


function validate() {
    if (testimonial.value.author.length == 0) {
        return "Empty author field";
    }

    if (testimonial.value.description.length == 0) {
        return "Empty description field";
    }
}

</script>

<template>
    <Editor @done="emit('done')" v-bind="{ confirm, delete_, validate }">
        <template v-slot:title>
            <slot></slot>
        </template>

        <template v-slot:items>
            <Input v-model="testimonial.author">Author</Input>
            <TextArea v-model="testimonial.description">Quote</TextArea>
            <ImageResourceSelector allow-none v-model="testimonial.image_id"></ImageResourceSelector>
        </template>
    </Editor>
</template>