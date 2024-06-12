<script setup lang="ts">
import { ref } from 'vue';
import { type Stage } from '@/lib/remote/Models';
import Input from '@/components/util/input/Input.vue';
import Editor from '@/components/cms/util/Editor.vue';

const props = defineProps<{
    confirm: ConfirmationCallback
    delete_?: ConfirmationCallback
}>();

const stage = defineModel<Stage>({ required: true });

const error = ref<string>();

const emit = defineEmits<{
    done: []
}>();

function validate() {
    if (stage.value?.name.length == 0) {
        return "Empty name";
    }
}

</script>

<template>
    <Editor @done="emit('done')" v-bind="{ confirm, delete_, validate }">
        <template v-slot:title>
            <slot></slot>
        </template>
        <template v-slot:items>
            <Input v-model="stage.name">Name</Input>
        </template>
    </Editor>
</template>