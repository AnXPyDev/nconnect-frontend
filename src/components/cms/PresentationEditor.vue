<script setup lang="ts">
import { ref } from 'vue';
import { type Presentation } from '@/lib/Bridge';

const props = defineProps<{
    allowDelete?: boolean
}>();

const timeslot = defineModel<Presentation>("presentation", { required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function confirm() {
    if (timeslot.value.name.length == 0) {
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
        <input v-model="presentation.name"></input>
        <textarea v-model="presentation.description"></textarea>
        <textarea v-model="presentation.long_description"></textarea>
        <button @click="confirm">confirm</button>
        <button v-if="allowDelete" @click="delete_">delete</button>
        <button @click="cancel">cancel</button>
        <div v-if="error">{{ error }}</div>
    </div>
</template>