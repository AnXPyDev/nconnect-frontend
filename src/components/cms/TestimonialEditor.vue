<script setup lang="ts">
import type { Testimonial } from '@/lib/Bridge';
import { ref } from 'vue';


const props = defineProps<{
    allowDelete?: boolean
}>();

const testimonial = defineModel<Testimonial>("testimonial", { required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function confirm() {
    if (testimonial.value.author.length == 0) {
        error.value = "Empty author field";
        return;
    }

    if (testimonial.value.description.length == 0) {
        error.value = "Empty description field";
        return;
    }

    emit("done");
}

function delete_() {
    emit("delete");
}

function cancel() {
    emit("cancel");
}

</script>

<template>
    <div>
        <input v-model="testimonial.author"></input>
        <textarea v-model="testimonial.description"></textarea>
        <button @click="confirm">confirm</button>
        <button v-if="allowDelete" @click="delete_">delete</button>
        <button @click="cancel">cancel</button>
        <div v-if="error">{{ error }}</div>
    </div>
</template>