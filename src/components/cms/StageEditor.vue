<script setup lang="ts">
import { ref } from 'vue';
import { type Stage } from '@/lib/Bridge';
import Button from '../Button.vue';
import Input from '../Input.vue';
import Editor from './Editor.vue';

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

function validate() {
    if (stage.value?.name.length == 0) {
        return "Empty name";
    }

    return true;
}

</script>

<template>

    <Editor @done="emit('done')" @cancel="emit('cancel')" @delete="emit('delete')"  :allow-delete="allowDelete" :validate="validate">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input v-model="stage.name">Name</Input>
        </template>
    </Editor>
</template>