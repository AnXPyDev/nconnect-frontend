<script setup lang="ts">
import { ref } from 'vue';
import { type Gallery } from '@/lib/Bridge';
import ImageResourceSelector from './ImageResourceSelector.vue';

const props = defineProps<{
    allowDelete?: boolean
}>();

const gallery = defineModel<Gallery>("gallery", { required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function confirm() {
    if (gallery.value!!.name.length == 0) {
        error.value = "No name";
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
        <input v-model="gallery.name"></input>
        <textarea v-model="gallery.description"></textarea>
        <ImageResourceSelector v-model="gallery.thumbnail_id"></ImageResourceSelector>
        <button @click="confirm">confirm</button>
        <button v-if="allowDelete" @click="delete_">delete</button>
        <button @click="cancel">cancel</button>
        <div v-if="error">{{ error }}</div>
    </div>
</template>