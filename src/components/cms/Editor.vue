<script setup lang="ts">
import { ref } from 'vue';
import { type Stage } from '@/lib/Bridge';
import Button from '../Button.vue';

const props = withDefaults(defineProps<{
    allowDelete?: boolean
    validate?: () => boolean | string
}>(), {
    validate: () => true
});

const error = ref<string>();

const emit = defineEmits<{
    done: [],
    delete: [],
    cancel: []
}>();


function confirm() {
    const result = props.validate();
    
    if (result !== true) {
        if (typeof(result) === "string") {
            error.value = result;
        } else {
            error.value = "Unknown error";
        }

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
    <div class="editor">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="items">
            <slot name="items"></slot>
        </div>
        <div class="controls">
            <Button @click="confirm"><i class="fa-solid fa-check"></i>&nbsp; CONFIRM</Button>
            <Button @click="cancel"><i class="fa-solid fa-xmark"></i>&nbsp; CANCEL</Button>
            <Button class="delete" v-if="allowDelete" @click="delete_"><i class="fa-solid fa-trash"></i>&nbsp; DELETE</Button>
        </div>
        <div class="error" v-if="error"><i class="fa-solid fa-circle-exclamation"></i>&nbsp; {{ error }}</div>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/lib/mixins';

.editor {
    @include mixins.cmspanel;

    display: flex;
    flex-direction: column;
    padding: 0.5em;

    gap: 0.5em;

    > .controls {
        display: flex;

        > .delete {
            --clr-active: var(--clr-error);
            --clr-fg-active: var(--clr-fg-on-error);
        }
    }

    > .items {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    > .error {
        font-size: 1.2em;
        color: var(--clr-error);
    }
}
</style>