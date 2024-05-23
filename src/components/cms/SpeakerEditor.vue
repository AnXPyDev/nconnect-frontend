<script setup lang="ts">
import { ref } from 'vue';
import { type Speaker, type Stage } from '@/lib/Bridge';

const props = defineProps<{
    allowDelete?: boolean
}>();

const speaker = defineModel<Speaker>("speaker", { required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function confirm() {
    if (speaker.value!!.name.length == 0) {
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
    <input v-model="speaker.name"></input>
    <textarea v-model="speaker.description"></textarea>
    <button @click="confirm">confirm</button>
    <button v-if="allowDelete" @click="delete_">delete</button>
    <button @click="cancel">cancel</button>
    <div v-if="error">{{ error }}</div>
</template>