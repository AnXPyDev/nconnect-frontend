<script setup lang="ts">
import { ref } from 'vue';
import { type Stage } from '@/lib/Bridge';

const props = defineProps<{
    allowDelete?: boolean
}>();

const stage = defineModel<Stage>("stage", { required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function confirm() {
    if (stage.value?.name.length == 0) {
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
        <input v-model="stage.name"></input>
        <button @click="confirm">confirm</button>
        <button v-if="allowDelete" @click="delete_">delete</button>
        <button @click="cancel">cancel</button>
        <div v-if="error">{{ error }}</div>
    </div>
</template>