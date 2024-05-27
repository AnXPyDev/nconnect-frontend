<script setup lang="ts">
import { ref } from 'vue';
import { type Resource } from '@/lib/Bridge';

const props = defineProps<{
    allowDelete?: boolean
}>();

const resource = defineModel<Resource>("resource", { required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function confirm() {
    if (resource.value.name.length == 0) {
        error.value = "Name field empty";
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
        <input v-model="resource.name"></input>
        <button @click="confirm">confirm</button>
        <button v-if="allowDelete" @click="delete_">delete</button>
        <button @click="cancel">cancel</button>
        <div v-if="error">{{ error }}</div>
    </div>
</template>